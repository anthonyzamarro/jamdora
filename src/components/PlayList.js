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
    }
    
    playSong(e) {
        this.props.chosenVersion(e.target.dataset.date, e.target.dataset.title);
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