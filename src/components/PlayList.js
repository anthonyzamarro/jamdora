import React from 'react';

export default class PlayList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playList: []
        }
    }

    render() {
        return (
            <div className="playlist">
                <h2>Play List</h2>
                <ul>
                    <li></li>
                </ul>
            </div>
        )
    }
}