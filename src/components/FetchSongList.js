import React from 'react';
import AllSelectList from './AllSelectList';
import FetchMarkedSong from './FetchMarkedSong';

export default class Fetch extends React.Component {
	constructor(props) {
		super(props);	
		this.state = {
			loading: true,
			selectSongId: null,
			selectSongTitle: null
		}
	}

	async componentDidMount() {
		const allSongs = await fetch(`https://api.phish.net/v3/jamcharts/all?apikey=${process.env.REACT_APP_PHISH_NET_KEY}`)
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
						chosenSong={(e) => this.selectSongIdHandler(e)}
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

