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
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('updated', prevProps, prevState);
    }

    onDropHandler(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        this.setState({
            playList: this.state.playList.concat(data)
        })
    }

    onDragOverHandler(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }

    render() {
        return (
            <div className="playlist">
                <h2>Play List</h2>
                <div onDrop={this.onDropHandler} 
                    onDragOver={this.onDragOverHandler}
                    id="target"
                    className="playlist__zone"
                >

                    {
                        this.state.playList.map((song, index) => {
                            return <p key={index}>{song}</p>
                        })
                    }
                </div>
            </div>
        )
    }
}