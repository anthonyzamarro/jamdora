import React from 'react';

export default class AllSelectList extends React.Component {
    constructor(props) {
        super(props);
        this.state =  {
            value: ''
        }
        this.handleSongIdChange = this.handleSongIdChange.bind(this);
    }

    handleSongIdChange(event) {
        this.setState({ value: event.target.value })
        this.props.chosenSong(event.target.selectedOptions[0].id, event.target.value);
    }


            
    render() {
        return (
            <div className="songs__all">
            <h2>Select a Song</h2>
			<select className="songs" value={this.state.value} onChange={this.handleSongIdChange}>
				{
                    
					this.props.songList.map(song => {
						return  (
                        <option 
                            key={song.songid}
                            id={song.songid}
                            value={song.song}
                        >
                                {song.song}
                        </option>
                        )
					})
				}
			</select>
            </div>
        )
    }
}