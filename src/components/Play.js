import React from 'react';

export default class Play extends React.Component {
    constructor(props) {
        super(props);

        this.state  = {
            currentTime: 0
        }

        this.audioRef = React.createRef();
        this.togglePlay = this.togglePlay.bind(this);
        this.manuallyUpdateTime = this.manuallyUpdateTime.bind(this);
        this.playNextSong = this.playNextSong.bind(this);
    }

    componentDidMount() {
        this.audioRef.current.addEventListener("timeupdate", e => {
            this.setState({
                currentTime: Math.round(e.target.currentTime),
                duration: Math.round(e.target.duration)
            });
        });
        document.addEventListener('keydown', e => {
            if (e.key === ' ') {
                this.togglePlay()
            }
        })
    }

    componentWillUnmount() {
        this.audioRef.current.removeEventListener("timeupdate", () => {});
        document.removeEventListener("keydown", () => {});
    }

    componentDidUpdate(prevProps, prevState) {
        // there's only ever one song to play from clicking play button
        if(this.props.songToPlay !== prevProps.songToPlay) {
            const songToPlay = this.props.songToPlay[0];
            const songSource = this.props.songToPlay !== null ? songToPlay.mp3 : null;
            if (this.audioRef.current) {
                this.audioRef.current.pause(); 
                this.audioRef.current.src = songSource;
                this.audioRef.current.load(); 
                this.audioRef.current.play();

                this.props.currentSongInfo(
                    {
                     title: this.props.songToPlay[0].title, 
                     date: this.props.songToPlay[0].show_date, 
                     venueName: this.props.songToPlay[0].venue_name, 
                     venueLocation: this.props.songToPlay[0].venue_location}
                    );
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
                this.playNextSong();
            }
        }

        if (this.state.currentTime !== prevState.currentTime) {
            this.setState({
                currentTime: this.state.currentTime
            });
        }
    }

    playNextSong(e) {
        let nextSong;
        if (e && e.target.id === 'prev') {
            nextSong = this.props.playList[this.state.currentSongPlayListIndex-1];
        }
        else {
            nextSong = this.props.playList[this.state.currentSongPlayListIndex+1];
        }

        if (nextSong !== undefined) {
            this.setState({
                currentTime: 0,
                duration: 1
            }); 
            this.props.nextSong(nextSong);
        }
    }

    updateTime() {
        this.setState({
            currentTime: this.state.currentTime
        })
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
        if (this.audioRef.current.src !== "") {
            this.audioRef.current.currentTime = e.target.value;
        }
    }

    render() {
        const endTime = this.state.duration !== null ? this.state.duration : 0;
        return (
            <header>
               <div className="logo">Jamdora</div>
               <div className="controls">
                    <audio ref={this.audioRef} className="controls__play"></audio>
                    <div className="controls__previous" onClick={this.playNextSong} id="prev"> &lt; </div>
                    <div className="controls__play" onClick={this.togglePlay}> |&gt; </div>
                    <div className="controls__next" onClick={this.playNextSong} id="next"> &gt; </div>
                </div>
               <div className="time"> 
                        <div className="time__start"> {
                            `${getTime(this.state.currentTime)}`
                            } </div>
                        <div className="time__duration duration"
                            tabIndex={-1}
                        >
                        <input 
                            type="range" 
                            min={0} 
                            value={this.state.currentTime}
                            max={endTime} 
                            className="duration__elapsed"
                            onChange={this.manuallyUpdateTime}
                        />
                        </div>
                        <div className="time__end"> {getTime(endTime)} </div>
                    </div>
            </header>
        )
    }
}

// found nifty timer function from here:
// https://dev.to/ma5ly/lets-make-a-little-audio-player-in-react-p4p
function getTime(time) {
    if(!isNaN(time)) {
      return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    }
    return '0:00';
  }