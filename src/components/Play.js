import React from 'react';

export default class Play extends React.Component {
    constructor(props) {
        super(props);
        this.audioRef = React.createRef();

        this.state = {
            playing: false
        }

        this.endOfCurrentSong = this.endOfCurrentSong.bind(this);
    }

    componentDidMount() {
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
    }

    endOfCurrentSong(e) {
        console.log(e)
        document.querySelector('audio').addEventListener('playing', a => {
            console.log(a)
            if (this.audioRef.current.ended) {
                console.log(this.audioRef.current);
                console.log(this.props);

            }
        })
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