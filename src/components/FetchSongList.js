import React from 'react';
//import AllSelectList from './AllSelectList';
import FetchMarkedSong from './FetchMarkedSong';
import Play from './Play'
import SearchForSong from './SearchForSong';
import PlayList from './PlayList';
import fetchJsonp from 'fetch-jsonp'
import SongInfo from './SongInfo';


export default class Fetch extends React.Component {
	constructor(props) {
		super(props);	
		this.state = {
			loading: true,
			selectSongId: null,
			selectSongTitle: null,
			songVersion: null,
			playList: [],
			addedFromClick: []
		}
	}

	async componentDidMount() {
		const allSongs = await fetchJsonp(`https://api.phish.net/v3/jamcharts/all?apikey=${process.env.REACT_APP_PHISH_NET_KEY}`, {
			method: 'POST',
			timeout: 3000,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
		}).catch(err => console.error(err));

		let json = await allSongs.json();
		if (json) {
			this.setState({ songs: json.response.data, loading: false });
		}

	}	

	updatePlayList(songs) {
		this.setState({
			playList: [...songs]
		});
	}
	
	addedFromClick(songs) {
		this.setState({
			addedFromClick: [...songs]
		});
	}

    selectSongIdHandler(songId, songName) {
        this.setState({
            selectSongId: songId, 
			selectSongTitle: songName
        })
    }

	selectedSongVersion = async (song) => {
		const showDate = await fetch(`https://phish.in/api/v1/shows/${song.date}`, {
									method: 'GET',
									headers: {
									Authorization: `Bearer ${process.env.REACT_APP_PHISH_IN_KEY}`,
									'Accept': 'application/json'
								}
							})
							.catch(err => console.error(err));
		const json	= await showDate.json();

		if (json.success) {
			
			const songVersion = json.data.tracks.filter(fetchedSong => fetchedSong.title === song.title);
			this.setState({
				songVersion: songVersion
			});
		}

	}

	passCurrentSong(songInfo) {
		this.setState({
			playingSongInfo: songInfo
		});
	}

	render() {
		return (
			<>
				<Play 
					songToPlay={this.state.songVersion}
					playList={this.state.playList}
					nextSong={this.selectedSongVersion}
					currentSongInfo={e => this.passCurrentSong(e)}
				/>
				<SongInfo currentSong={this.state.playingSongInfo}/>
				<div className="search-song__container container">
					<h2>Search for Song</h2>
						{
						this.state.loading || !this.state.songs ?
							<p>Loading...</p>
						:
							<SearchForSong 
								songList={this.state.songs} 
								chosenSong={(i, s) => this.selectSongIdHandler(i, s)}	
							/>
						}
				</div>	

				<div className="marked-song__container container">
					<FetchMarkedSong 
						markedSongId={this.state.selectSongId}
						markedSongTitle={this.state.selectSongTitle}
						// updates when user has clicked on song
						addedFromClick={(e) => this.addedFromClick(e)}
					/>
				</div>

				<div className="playlist__container container">
					<PlayList
						chosenVersion={(song) => this.selectedSongVersion(song)}
						// pass clicked song from parent to component
						addedFromClick={this.state.addedFromClick}
						// updates when song has been dropped
						addToPlayList={e => this.updatePlayList(e)}
					/>
				</div>
			</>
		) 
	}

};

