import React from 'react';
import AllSelectList from './AllSelectList';
import FetchMarkedSong from './FetchMarkedSong';
import Play from './Play'
import SearchForSong from './SearchForSong';

export default class Fetch extends React.Component {
	constructor(props) {
		super(props);	
		this.state = {
			loading: true,
			selectSongId: null,
			selectSongTitle: null,
			songVersion: null
		}
	}

	async componentDidMount() {
		const allSongs = await fetch(`https://api.phish.net/v3/jamcharts/all?apikey=${process.env.REACT_APP_PHISH_NET_KEY}`)
		const json = await allSongs.json()

		this.setState({ songs: json.response.data, loading: false });
	}	

    selectSongIdHandler(songId, songName) {
        this.setState({
            selectSongId: songId, 
			selectSongTitle: songName
        })
    }

	async selectedSongVersion(songInfo, songTitle) {
		const showDate = await fetch(`http://phish.in/api/v1/shows/${songInfo.showdate}`, {
									headers: {
									Authorization: `Bearer ${process.env.REACT_APP_PHISH_IN_KEY}`
								}
							})
		const json	= await showDate.json();

		const songVersion = json.data.tracks.filter(song => song.title === songTitle);
		this.setState({
			songVersion: songVersion
		})
	}

	render() {
		return (
			<div className="container">
				<Play songToPlay={this.state.songVersion}/>
				<SearchForSong 
					songList={this.state.songs} 
					chosenSong={(i, s) => this.selectSongIdHandler(i, s)}	
				/>
				{
				this.state.loading || !this.state.songs ?
					 <p>Loading...</p>
				:

					<AllSelectList 
						songList={this.state.songs} 
						chosenSong={(i, s) => this.selectSongIdHandler(i, s)}
					/>
				}


					<FetchMarkedSong 
						markedSongId={this.state.selectSongId} 
						markedSongTitle={this.state.selectSongTitle} 
						chosenVersion={(songInfo, songTitle) => this.selectedSongVersion(songInfo, songTitle)}
					/>
			</div>
		) 
	}

};

