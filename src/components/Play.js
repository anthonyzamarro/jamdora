import React from 'react';

export default class Play extends React.Component {

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(prevProps.songToPlay) {
    //         this.
    //     }
    // }
    playSong() {
        const playSong = this.props.songToPlay !== null ? this.props.songToPlay[0].mp3 : null;
        this.setState({ isPlaying: playSong, function() {
                this.refs.audio.pause()
                this.refs.audio.load()
                this.refs.audio.play()
            }
            
        })
    }


    render() {
        return (
            <div>
                <audio controls ref="audio">
                    <source src={e => this.playSong()} type="mpeg"/>
                </audio>
            </div>
        )
    }
}