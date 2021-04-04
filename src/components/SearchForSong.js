import { render } from '@testing-library/react';
import React from 'react';

export default class SearchForSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }

        this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
    }

    onKeyUpHandler(event) {
        console.log(event);
        if(event.keyCode === 13) {
            this.props.chosenSong(event.target.value);
        }
    }
    
    render() {
        return (
            <div className="songs__all">
                <h2>Search for Song</h2>
                
                <input type="text" onKeyUp={this.onKeyUpHandler} />
                <input type="submit" value="Search" />
            </div>
        )
    }

}