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
        console.log('onDropHandler', e)
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        console.log(data);
//        e.target.appendChild(document.getElementById(data));;
    }

    onDragOverHandler(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        //console.log('onDragOverHandler', e);

    }

    render() {
        return (
            <div className="playlist">
                <h2>Play List</h2>
                <ul onDrop={this.onDropHandler} 
                    onDragOver={this.onDragOverHandler}
                    id="target"
                >

                    <li></li>
                </ul>
            </div>
        )
    }
}