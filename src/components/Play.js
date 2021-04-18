import React from 'react';

export default class Play extends React.Component {
    constructor(props) {
        super(props);
        this.audioRef = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.props.playList);
        const songSource = this.props.songToPlay !== null ? this.props.songToPlay[0].mp3 : null;
        if(this.props.songToPlay !== prevProps.songToPlay) { 

            if (this.audioRef.current) {
                this.audioRef.current.pause(); 
                this.audioRef.current.src = songSource;
                this.audioRef.current.load(); 
                this.audioRef.current.play(); 
            }

        }
    }


    render() {
        const title = this.props.songToPlay &&  this.props.songToPlay[0].title;
        const date = this.props.songToPlay  &&  this.props.songToPlay[0].show_date;
        return (
            <div className="song__info">
                <audio controls ref={this.audioRef}>
                    <source src="" type="mpeg"/>
                </audio>
                <p>{title}</p>
                <p>{date}</p>
            </div>
        )
    }
}