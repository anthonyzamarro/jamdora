import React from 'react';

export default class SearchForSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }

        this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
        this.onFocusHandler = this.onFocusHandler.bind(this);
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

    onFocusHandler(event) {
        if(event.currentTarget == event.target) {
            console.log('focused', event);
            event.target.insertAdjacentHTML('afterend', '<div>Hi</div>');
        } else {
            console.log('not focused', event);
        }

    }
    
    render() {
        return (
            <div>
                <h2>Search for Song</h2>
                <input type="text" onKeyUp={this.onKeyUpHandler} onFocus={this.onFocusHandler}/>
                <input type="submit" value="Search" />
            </div>
        )
    }

}

/*
    when user focuses on input box, list of divs with song name appears
    as user types, the list is filtered by each character typed
    user can select one song from the list and that will fetch the marked versions

    element listens to when it is focused (active?)
    when focused is true, all songs display below input box (in array?) with max height and scrollable
    while still focused, as user types, list is filtered by characters. use regex and filter function
    user can click on song from list and that will be fetched for its marked version
*/