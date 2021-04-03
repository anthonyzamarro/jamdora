import React from 'react';


export default class FetchMarkedSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markedVersions: null
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
		const markedSongs = await fetch(`https://api.phish.net/v3/jamcharts/get?apikey=${process.env.REACT_APP_PHISH_NET_KEY}&songid=${this.props.markedSongId}`)
		const json = await markedSongs.json()
        
        if (this.props.markedSongId !== prevProps.markedSongId) {
            if (json.error_code === 0) {
                this.filterMarkedSongs(json.response.data.entries, this.props.markedSongId)
            }
        }
    }

    filterMarkedSongs(songs, id) {
        const markedRecommended = songs.filter(song => song.marked_recommended > 0)
        this.setState({
            markedVersions: markedRecommended,
            markedId: id
        })
    }

    onClickHandler(songInfo, songTitle) {
        this.props.chosenVersion(songInfo, songTitle)
    }

    render() {
        return (
            <div className="song__marked">
                <h2>Selected Song</h2>
               <p>{this.props.markedSongTitle}</p>
                {
                    this.state.markedVersions && this.state.markedVersions.map((marked, idx) => {
                        return (
                           <p 
                                key={idx}
                                onClick={(e) => this.onClickHandler(marked, this.props.markedSongTitle)}
                            >
                                {marked.showdate}
                           </p>
                           
                        )
                    })
                }

            </div>
        )
    }
}





