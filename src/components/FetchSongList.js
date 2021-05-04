import React from 'react';
//import AllSelectList from './AllSelectList';
import FetchMarkedSong from './FetchMarkedSong';
import Play from './Play'
import SearchForSong from './SearchForSong';
import PlayList from './PlayList';


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
		const allSongs = await fetch(`https://api.phish.net/v3/jamcharts/all?apikey=${process.env.REACT_APP_PHISH_NET_KEY}`)
		const json = await allSongs.json()

		this.setState({ songs: json.response.data, loading: false });
	}	

	updatePlayList(songs) {
		this.setState({
			playList: this.state.playList.concat(songs)
		}, e => console.log(this.state.playList));
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

	selectedSongVersion = async (showdate, songTitle) => {
		const showDate = await fetch(`http://phish.in/api/v1/shows/${showdate}`, {
									headers: {
									Authorization: `Bearer ${process.env.REACT_APP_PHISH_IN_KEY}`
								}
							}).catch(err => console.log(err))
		const json	= await showDate.json();


		const songVersion = json.data.tracks.filter(song => song.title === songTitle);
		this.setState({
			songVersion: songVersion
		});
	}

	render() {
		return (
			<>

				<div className="logo">Jamdora</div>
				<Play 
					songToPlay={this.state.songVersion}
					playList={this.state.playList}
					nextSong={this.selectedSongVersion}
				/>
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

				<div className="container">
					<FetchMarkedSong 
						markedSongId={this.state.selectSongId}
						markedSongTitle={this.state.selectSongTitle}
						// updates when user has clicked on song
						addedFromClick={(e) => this.addedFromClick(e)}
					/>
				</div>

				<div className="container">
					<PlayList
						chosenVersion={(showDate, songTitle) => this.selectedSongVersion(showDate, songTitle)}
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

