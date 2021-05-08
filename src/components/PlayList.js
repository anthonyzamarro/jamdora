import React from 'react';

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

     componentDidUpdate(prevProps, prevState) {
         if (prevProps.addedFromClick !== this.props.addedFromClick) {
            this.setState({
                playList: this.state.playList.concat(this.props.addedFromClick)
            }, e => {
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
        });

    }

    onDragOverHandler(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }

    render() {
        return (
            <div className="playlist">
                <h2>Play List</h2>
                <div
                    onDrop={this.onDropHandler} 
                    onDragOver={this.onDragOverHandler}
                    id="target"
                    className="playlist__zone"
                >

                    {
                        this.state.playList.map((info, index) => {
                            console.log(info);
                            return (
                                <p key={index}>
                                    <span onClick={this.removeFromPlayList} id={index}>X Remove&nbsp; </span>
                                    <span>{info.title}</span> 
                                        {info.text} 
                                        <span 
                                            data-title={info.title}
                                            data-date={info.date}
                                            data-text={info.text}
                                            onClick={this.playSong}>&nbsp; Play &gt;
                                        </span>
                                    </p>
                                )
                        })
                    }
                </div>
            </div>
        )
    }
}