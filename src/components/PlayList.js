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
        this.props.chosenVersion(e.target.dataset.date, e.target.dataset.title);
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
                            return (
                                <p key={index}>
                                    <span onClick={this.removeFromPlayList} id={index}>X Remove&nbsp; </span>
                                    <span>{info.title}</span> 
                                        {info.text} 
                                        <span 
                                            data-title={info.title}
                                            data-date={info.date} 
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