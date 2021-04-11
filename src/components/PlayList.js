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
        console.log('onDropHandler', e);
    }

    onDragOverHandler(e) {
        //console.log('onDragOverHandler', e);

    }

    render() {
        return (
            <div className="playlist">
                <h2>Play List</h2>
                <ul onDrop={this.onDropHandler} 
                    onDragOver={this.onDragOverHandler}>
                    <li></li>
                </ul>
            </div>
        )
    }
}