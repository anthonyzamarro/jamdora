import React from 'react';

export default class SearchForSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            list: this.props.songList
        }

        this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
        this.onFocusHandler = this.onFocusHandler.bind(this);
        this.onBlurHandler = this.onBlurHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onKeyUpHandler(e) {
        if(e.keyCode === 13) {
                const song = this.props.songList.filter(song => {
                const lower = song.song.toLowerCase();
                if (lower.includes(e.target.value)) {
                    document.querySelector('.dropdown').classList.remove('active'); 
                    return song;
                }
                return null;
            });

            if (song.length < 2) {
                this.props.chosenSong(song[0].songid, song[0].song);
            } 
        }

        
    }

    onChange(e) {
        const filtered = this.props.songList.filter((song, index) => {
            let lowerCaseSong = song.song.toLowerCase();
            let lowerCaseInput = e.target.value.toLowerCase();
            if (lowerCaseInput !== "") {
                if(lowerCaseSong.includes(lowerCaseInput)) {
                    return song
                }
            }
            
        });
        this.setState({
            list: filtered
        });
    }

    onFocusHandler(e) {
        if(e.currentTarget === e.target) {
            document.querySelector('.dropdown').classList.add('active');
        }
    }
    
    onBlurHandler(e) {
        if (e.relatedTarget == null) {
            document.querySelector('.dropdown').classList.remove('active'); 
        }
    }

    onClickHandler(e) {
        document.querySelector('.dropdown').classList.remove('active'); 
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
                    onChange={this.onChange}
                />
                <ul 
                    className="dropdown"
                    tabIndex="-1"
                >
                    {
                       
                         this.state.list && this.state.list.map((song, index) => {
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