import React from 'react';

export default class Play extends React.Component {
    constructor(props) {
        super(props);

        this.state  = {
            currentTime: 0,
            duration: 1,
            secondsElapsed: 0,
            minutesElapsed: 0
        }

        this.audioRef = React.createRef();
        this.updateTime = this.updateTime.bind(this);
        this.pauseSong = this.pauseSong.bind(this);
        this.playSong = this.playSong.bind(this);
    }

    componentDidMount(e) {
        this.audioRef.current.addEventListener("timeupdate", e => {
            this.setState({
                currentTime: Math.round(e.target.currentTime),
                duration: Math.round(e.target.duration)
            });
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log(this.props);
        // there's only ever one song to play
        if(this.props.songToPlay !== prevProps.songToPlay) {
            this.setState({
                secondsElapsed: 0,
                minutesElapsed: 0
            });

            const songToPlay = this.props.songToPlay[0];
            const songSource = this.props.songToPlay !== null ? songToPlay.mp3 : null;
            if (this.audioRef.current) {
                this.audioRef.current.pause(); 
                this.audioRef.current.src = songSource;
                this.audioRef.current.load(); 
                this.audioRef.current.play();
            }

            this.props.playList.findIndex((s, i)=> {
                if (songToPlay.title === s.title && songToPlay.show_date === s.date) {
                    this.setState({
                        currentSongPlayListIndex: i
                    });
                } 
            });
        }
        // play next song in playlist after current song is over.
        if (this.state && this.state.currentTime !== undefined && this.state.currentTime === this.state.duration) {
            this.audioRef.current.pause();
            if (this.props.playList.length > 0) {
                const nextSong = this.props.playList[this.state.currentSongPlayListIndex+1];
                 if (nextSong !== undefined) {
                     this.setState({
                         currentTime: 0,
                         duration: 1,
                         secondsElapsed: 0,
                         minutesElapsed: 0
                    });
                    this.props.nextSong(nextSong.date, nextSong.title);
                 }
            }
        }

        if (this.state.currentTime !== prevState.currentTime) {
            this.updateTime();
        }
    }

    updateTime() {
         if (this.state.secondsElapsed >= 59) {
            this.setState(prevState => {
                return {
                    secondsElapsed: -1,
                    minutesElapsed: prevState.minutesElapsed + 1
                }
            });
        }
        this.setState(prevState => {
            return { secondsElapsed: prevState.secondsElapsed + 1 }
        });
    }

    pauseSong() {
        this.audioRef.current.pause();
    }

    playSong() {
        this.audioRef.current.play();
    }

    togglePlay() {
        if (this.audioRef.current) {
            if (this.audioRef.current.paused()) {
                this.audioRef.current.play();
            }
            this.audioRef.current.pause();
        }
    }

    render() {
        const title =  this.props.songToPlay && this.props.songToPlay[0].title;
        const date  =  this.props.songToPlay && this.props.songToPlay[0].show_date;
        // let endTime = this.state.duration !== null ? 
        //     (this.state.duration / 60).toFixed(2) : 0;
        //     endTime = endTime.split('.').join(':');
        let endTime = this.state.duration !== null ? this.state.duration : 0;
        return (
            <div className="song__info">
                <div className="controls">
                    <audio ref={this.audioRef} className="controls__play"> </audio>
                    <div className="controls__play" onClick={this.togglePlay}> |&gt; </div>
                    <div className="controls__next"> &gt; </div>
                    <div className="controls__previous"> &lt; </div>
                    <div className="controls__time time"> 
                        <div className="time__start"> {
                            `${this.state.minutesElapsed}:${this.state.secondsElapsed < 10 ? '0' + this.state.secondsElapsed : this.state.secondsElapsed}`
                            } </div>
                        <div className="time__duration duration">
                           <div 
                                className="duration__elapsed"
                                onTimeUpdate={this.updateTime}
                                style={{width: Math.round(this.state.currentTime)}}
                           >
                           </div> 
                        </div>
                        <div className="time__end"> {formatTime(endTime)} </div>
                    </div>
                </div>
                <p>{title}</p>
                <p>{date}</p>
            </div>
        )
    }
}

function formatTime(time) {
    if (time > 0) {
        time = (time / 60).toFixed(2);
        time = time.split('.');
        let seconds = parseInt(time[1]);
        let minutes = parseInt(time[0]);
        if (seconds >= 60) {
            seconds = seconds - 60;
            minutes++;
        }
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds }`;
    }
}