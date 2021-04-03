import React from 'react';

export default class Play extends React.Component {
    constructor(props) {
        super(props);
        this.audioRef = React.createRef();
    }

    playSong() {
        
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const songSource = this.props.songToPlay !== null ? this.props.songToPlay[0].mp3 : null;
        if (this.audioRef.current) {
            this.audioRef.current.src = songSource;
            this.audioRef.current.load(); 
            this.audioRef.current.play(); 
        }
    }


    render() {
        return (
            <div>
                <audio controls ref={this.audioRef}>
                    <source src="" type="mpeg"/>
                </audio>
            </div>
        )
    }
}