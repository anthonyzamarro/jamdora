import React from 'react';

export default class PlayList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playList: []
        }
        this.onDropHandler = this.onDropHandler.bind(this);
        this.onDragOverHandler = this.onDragOverHandler.bind(this);
    }

    onDropHandler(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        this.setState({
            playList: this.state.playList.concat(data)
        })

        console.log(this.state);

    }

    onDragOverHandler(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }

    render() {
        return (
            <div className="playlist">
                <h2>Play List</h2>
                <ul onDrop={this.onDropHandler} 
                    onDragOver={this.onDragOverHandler}
                    id="target"
                >

            <li>{
                this.state.playList.map(song => song)
            }</li>
                </ul>
            </div>
        )
    }
}