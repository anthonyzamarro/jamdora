import React from 'react';

export default class SelectList extends React.Component {
    constructor(props) {
        super(props);
    }    

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.songList !== prevProps.songList) {
            this.setState({
                songs: this.props.songList.data
            });
        }
    }

    render() {
        return (
            <div>
                <h2>hi</h2>
            </div>
        )
    }
}