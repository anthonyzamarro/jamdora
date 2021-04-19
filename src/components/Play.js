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
        if(this.props.songToPlay !== prevProps.songToPlay) { 
            const songSource = this.props.songToPlay !== null ? this.props.songToPlay[0].mp3 : null;
            if (this.audioRef.current) {
                this.audioRef.current.pause(); 
                this.audioRef.current.src = songSource;
                this.audioRef.current.load(); 
                this.audioRef.current.play(); 
            }
        }

        // handle when song ends and playList.length > 1
        if (this.state && this.state.currentTime === this.state.duration) {
            console.log(this.state, this.props.playList);
        }
    }

    render() {
        const title = this.props.songToPlay &&  this.props.songToPlay[0].title;
        const date = this.props.songToPlay  &&  this.props.songToPlay[0].show_date;
        return (
            <div className="song__info">
                <audio controls ref={this.audioRef} onClick={this.endOfCurrentSong}></audio>
                <p>{title}</p>
                <p>{date}</p>
            </div>
        )
    }
}