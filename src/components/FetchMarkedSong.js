import React from 'react';


export default class FetchMarkedSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectSongList: []
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
		const markedSongs = await fetch(`https://api.phish.net/v3/jamcharts/get?apikey=${process.env.REACT_APP_PHISH_NET_KEY}&songid=${this.props.markedSongId}`)
		const json = await markedSongs.json()

        if (json.error_code === 0) {
            this.filterMarkedSongs(json.response.data.entries)
        }

        if (prevProps.markedSongTitle !== this.props.MarkedSongTitle) {
           this.setState({
               selectSongList: this.state.selectSongList.concat(this.props.markedSongTitle)
           }) 
        }
    }

    filterMarkedSongs(songs) {
        const markedRecommended = songs.filter(song => song.marked_recommended > 0)
        console.log(markedRecommended);

    }

    render() {
        console.log(this.state);
        return (
            <div className="song__marked">
                <h2>Selected Song</h2>
                {this.props.markedSongTitle}
            </div>
        )
    }
}





