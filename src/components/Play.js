import React from 'react';

export default class Play extends React.Component {
    constructor(props) {
        super(props);
        this.audioRef = React.createRef();
    }

    componentDidMount(e) {
        this.audioRef.current.addEventListener("timeupdate", e => {
            this.setState({
                currentTime: e.target.currentTime,
                duration: e.target.duration
            });
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log(this.props);
        // there's only ever one song to play
        if(this.props.songToPlay !== prevProps.songToPlay) { 
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
                         duration: 1
                    });
                    this.props.nextSong(nextSong.date, nextSong.title);
                 }
            }
        }
    }

    render() {
        const title =  this.props.songToPlay && this.props.songToPlay[0].title;
        const date  =  this.props.songToPlay && this.props.songToPlay[0].show_date;
        return (
            <div className="song__info">
                <audio controls ref={this.audioRef}></audio>
                <p>{title}</p>
                <p>{date}</p>
            </div>
        )
    }
}