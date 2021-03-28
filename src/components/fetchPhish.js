import React from 'react';
//const axios = require('axios');

export default class Fetch extends React.Component {
	constructor(props) {
		super(props);	
		this.state = {
			songList: []
		}
	}

	componentDidMount() {
		fetch('https://api.phish.net/v3/jamcharts/all?apikey=074F91D5F301220F1104')
		.then(response => response.json())
		.then(data => {
			this.setState({
				songList: data.response.data
			});
			console.log(data);
			console.log(this.state);
		});
	}

	render() {
		return <h1> Hello, world !!!!!</h1>
	}

};

