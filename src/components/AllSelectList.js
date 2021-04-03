import React from 'react';

export default class AllSelectList extends React.Component {

    onClickHandler(song, e) {
        this.props.chosenSong(song);
    }


            
    render() {
        return (
            <div className="songs__all">
            <h2>Select a Song</h2>
			<ul className="songs">
				{
					this.props.songList.map(song => {
						return  (
                        <li 
                            key={song.songid} 
                            id={song.songid}
                            onClick={(e) => this.onClickHandler(song)}
                            >
                                {song.song}
                        </li>
                        )
					})
				}
			</ul>
            </div>
        )
    }
}