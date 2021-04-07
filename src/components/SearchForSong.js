import React from 'react';

export default class SearchForSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }

        this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
    }

    onKeyUpHandler(event) {
        if(event.keyCode === 13) {
            const song = this.props.songList.filter(song => {
                const lower = song.song.toLowerCase();
                if (lower.includes(event.target.value)) {
                    return song;
                }
                return null;
            });
            if (song.length < 2) {
                this.props.chosenSong(song[0].songid, song[0].song);
            } else {
                console.log(`Too many songs with same string!!!`, song);
            }
        }
    }
    
    render() {
        return (
            <div>
                <h2>Search for Song</h2>
                <input type="text" onKeyUp={this.onKeyUpHandler} />
                <input type="submit" value="Search" />
            </div>
        )
    }

}