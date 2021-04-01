import React from 'react';
import AllSelectList from './AllSelectList';
import FetchMarkedSong from './FetchMarkedSong';

export default class Fetch extends React.Component {
	constructor(props) {
		super(props);	
		this.state = {
			loading: true,
			songs: null,
			selectSongId: null
		}
	}

	async componentDidMount() {
		const allSongs = await fetch('https://api.phish.net/v3/jamcharts/all?apikey=074F91D5F301220F1104')
		const json = await allSongs.json()

		this.setState({ songs: json.response.data, loading: false });
	}

    selectSongIdHandler(song) {
        this.setState({
            selectSongId: song.songid,
			selectSongTitle: song.song
        })
    }

	render() {
		return (
			<div className="container">
				{
				this.state.loading || !this.state.songs ?
					 <p>Loading...</p>
				:
					<AllSelectList 
						songList={this.state.songs} 
						chosenSongId={(e) => this.selectSongIdHandler(e)}
					/>
				}
					<FetchMarkedSong 
						markedSongId={this.state.selectSongId} 
						markedSongTitle={this.state.selectSongTitle} 
					/>
			</div>
		) 
	}

};

