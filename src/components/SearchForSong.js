import React from 'react';

export default class SearchForSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }

        this.listRef = React.createRef();

        this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
        this.onFocusHandler = this.onFocusHandler.bind(this);
        this.onBlurHandler = this.onBlurHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
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
        if(event.currentTarget === event.target) {
            document.querySelector('.dropdown').classList.add('active');
        } else {
            console.log('not focused', event);
        }
    }
    
    onBlurHandler(e) {
        if (e.relatedTarget == null) {
            document.querySelector('.dropdown').classList.remove('active'); 
        }
    }

    onClickHandler(e) {
        this.props.chosenSong(e.target.id, e.target.textContent);
    }
    
    render() {
        return (
            <div className="songs__all">
                <h2>Search for Song</h2>
                <input
                    type="text" 
                    onKeyUp={this.onKeyUpHandler}
                    onFocus={this.onFocusHandler}
                    onBlur={this.onBlurHandler}
                />
                <input type="submit" value="Search" />
                <ul 
                    className="dropdown"
                    tabIndex="-1"
                >
                    {
                         this.props.songList && this.props.songList.map((song, index) => {
                            return <li 
                                onClick={this.onClickHandler} 
                                onBlur={this.onBlurHandler}
                                key={song.songid} 
                                id={song.songid} 
                                className="dropdown__item" 
                                tabIndex={index}>{song.song}</li>
                        }) 
                    }
                </ul>
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