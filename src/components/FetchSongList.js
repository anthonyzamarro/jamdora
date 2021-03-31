import React from 'react';
import SelectList from './SelectList';

export default class Fetch extends React.Component {
	constructor(props) {
		super(props);	
		this.state = {
			loading: true,
			songs: null
		}
	}

	async componentDidMount() {
		const allSongs = await fetch('https://api.phish.net/v3/jamcharts/all?apikey=074F91D5F301220F1104')
		const json = await allSongs.json()

		this.setState({ songs: json.response.data, loading: false });
	}

	render() {
		return (
			<ul>
				{
				this.state.loading || !this.state.songs ?
					 <p>Loading...</p>
				:
					this.state.songs.map(song => {
						return <li key={song.songid}>{song.song}</li>
					})
				}
			</ul>
		) 
	}

};

