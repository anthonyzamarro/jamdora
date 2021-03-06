import React from 'react';
import SavePlaylistLocalStorage from './SavePlaylistLocalStorage';

export default class PlayList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playList: []
        }
        this.onDropHandler = this.onDropHandler.bind(this);
        this.onDragOverHandler = this.onDragOverHandler.bind(this);
        this.playSong = this.playSong.bind(this);
        this.removeFromPlayList = this.removeFromPlayList.bind(this);
    }

    componentDidMount() {
        if (localStorage.localStoragePlaylist && JSON.parse(localStorage.localStoragePlaylist).length > 0) {
            this.setState({
                playList: JSON.parse(localStorage.localStoragePlaylist)
            }, e => {
                this.props.addToPlayList(JSON.parse(localStorage.localStoragePlaylist))
            });
        }
    }

     componentDidUpdate(prevProps, prevState) {
         if (prevProps.addedFromClick !== this.props.addedFromClick) {
            this.setState({
                playList: this.state.playList.concat(this.props.addedFromClick)
            }, e => {
                SavePlaylistLocalStorage(this.state.playList);
                this.props.addToPlayList(this.state.playList);
            });
        }
     }
    
    playSong(e) {
        const chosenSong = {
            date: e.target.dataset.date,
            title: e.target.dataset.title,
            text: e.target.dataset.text
        }
        this.props.chosenVersion(chosenSong);
    }

    removeFromPlayList(e) {
        let copiedList = [...this.state.playList];
        copiedList.splice(parseInt(e.target.id), 1); 
        this.setState({
            playList: copiedList
        }, e => {
            SavePlaylistLocalStorage(copiedList);
        });
    }

    onDropHandler(e) {
        e.preventDefault();
        const text = e.dataTransfer.getData("text/plain");
        const title = e.dataTransfer.getData("application/title");
        const date = e.dataTransfer.getData("application/date");
        this.setState({
            playList: this.state.playList.concat({'title': title, 'text': text, 'date': date})
        }, e => {
            this.props.addToPlayList(this.state.playList);
            SavePlaylistLocalStorage(this.state.playList);
        });

    }

    onDragOverHandler(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }

    render() {
        return (
            <div className="playlist">
                <h2>Playlist</h2>
                <div
                    onDrop={this.onDropHandler} 
                    onDragOver={this.onDragOverHandler}
                    id="target"
                    className="playlist__zone"
                >

                    {
                        this.state.playList.map((info, index) => {
                            return (
                                <p key={index}>
                                    <div>{info.title}</div>
                                        {info.text}<br></br>
                                        <div onClick={this.removeFromPlayList} 
						id={index} 
						className="btn btn-playlist btn-remove">Remove x</div>
                                        <div 
                                            className="btn btn-playlist btn-play"
                                            data-title={info.title}
                                            data-date={info.date}
                                            data-text={info.text}
                                            onClick={this.playSong}>Play &gt;
                                        </div>
                                    </p>
                                )
                        })
                    }
                </div>
            </div>
        )
    }
}
