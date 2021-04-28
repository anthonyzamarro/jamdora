import React from 'react';

export default class Play extends React.Component {
    constructor(props) {
        super(props);

        this.state  = {
            currentTime: 0,
            secondsElapsed: 0,
            minutesElapsed: 0
        }

        this.audioRef = React.createRef();
        this.updateTime = this.updateTime.bind(this);
        this.togglePlay = this.togglePlay.bind(this);
        this.manuallyUpdateTime = this.manuallyUpdateTime.bind(this);
    }

    componentDidMount() {
        this.audioRef.current.addEventListener("timeupdate", e => {
            this.setState({
                currentTime: Math.round(e.target.currentTime),
                duration: Math.round(e.target.duration)
            });
        });
    }

    componentWillUnmount() {
        this.audioRef.current.removeEventListener("timeupdate", () => {});
      }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // there's only ever one song to play from clicking play button
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
            console.log(this.state)
            this.updateTime();
        }
    }

    updateTime() {
        this.setState({
            currentTime: this.state.currentTime
        })
        //  if (this.state.secondsElapsed >= 59) {
        //     this.setState(prevState => {
        //         return {
        //             secondsElapsed: -1,
        //             minutesElapsed: prevState.minutesElapsed + 1
        //         }
        //     });
        // }
        // this.setState(prevState => {
        //     return { secondsElapsed: prevState.secondsElapsed + 1 }
        // });
    }

    togglePlay() {
        if (this.audioRef.current) {
            if (this.audioRef.current.paused) {
                this.audioRef.current.play();
            } else {
                this.audioRef.current.pause();
            }
        }
    }

    manuallyUpdateTime(e) {
        this.audioRef.current.pause();
        this.audioRef.current.currentTime = e.target.value;
        this.audioRef.current.play();
        const updatedTime = formatDurationTime(e.target.value);
        // console.log(updatedTime);
        //  this.setState({
        //      currentTime: e.target.value
        //  }, e => console.log(this.state));
    }

    render() {
        const title =  this.props.songToPlay && this.props.songToPlay[0].title;
        const date  =  this.props.songToPlay && this.props.songToPlay[0].show_date;
        const endTime = this.state.duration !== null ? this.state.duration : 0;
        return (
            <div className="song__info">
                <div className="controls">
                    <audio ref={this.audioRef} className="controls__play"></audio>
                    <div className="controls__previous"> &lt; </div>
                    <div className="controls__play" onClick={this.togglePlay}> |&gt; </div>
                    <div className="controls__next"> &gt; </div>
                    <div className="controls__time time"> 
                        <div className="time__start"> {
                        //    `${this.state.minutesElapsed}:${this.state.secondsElapsed < 10 ? '0' + this.state.secondsElapsed : this.state.secondsElapsed}`
                            `${getTime(this.state.currentTime)}`
                            } </div>
                        <div className="time__duration duration"
                            tabIndex={-1}
                        >
                        <input 
                            type="range" 
                            min={0} 
                            defaultValue={this.state.currentTime} 
                            max={endTime} 
                            className="duration__elapsed"
                            onChange={this.manuallyUpdateTime}
                        />
                        </div>
                        <div className="time__end"> {getTime(endTime)} </div>
                    </div>
                </div>
                <p>{title}</p>
                <p>{date}</p>
            </div>
        )
    }
}

// found nifty timer function from here:
// https://dev.to/ma5ly/lets-make-a-little-audio-player-in-react-p4p
// Below is my original one which only really worked for the duration time
function getTime(time) {
    if(!isNaN(time)) {
      return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    }
    return '0:00';
  }

// function formatDurationTime(time) {
//     if (time > 0) {
//         time = (time / 60).toFixed(2);
//         time = time.split('.');
//         let seconds = parseInt(time[1]);
//         let minutes = parseInt(time[0]);
//         seconds = 100 - seconds;
//         return `${minutes}:${seconds < 10 ? '0' + seconds : seconds }`;
//     }
//     return `0:00`;
// }




{/* <div 
className="duration__elapsed"
onTimeUpdate={this.updateTime}

style={{width: Math.round(this.state.currentTime)}}
><span className="duration__drag">O</span></div>  */}