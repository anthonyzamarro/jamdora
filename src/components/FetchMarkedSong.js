import React from 'react';
//import unslug from '../utils/unslug.js';

export default class FetchMarkedSong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markedVersions: null
        }

        this.onDragHandler = this.onDragHandler.bind(this);
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
		const markedSongs = await fetch(`https://api.phish.net/v3/jamcharts/get?apikey=${process.env.REACT_APP_PHISH_NET_KEY}&songid=${this.props.markedSongId}`)
		const json = await markedSongs.json()
        
        if (this.props.markedSongId !== prevProps.markedSongId) {
            if (json.error_code === 0) {
                this.filterMarkedSongs(json.response.data.entries, this.props.markedSongId);
            }
        }
    }

    async filterMarkedSongs(songs, id) {
        // only get marked song versions
        const markedFiltered = songs.filter(song => song.marked_recommended > 0 );

        // since the marked songs don't include their location info (state, country, venue)
        // i have to make another request for this information.
        // the second async call results in an array of promises, which all need to resolve
        const markedRecommended = await Promise.all(markedFiltered.map(async song => {
           const fetchShow = await fetch(`https://api.phish.net/v3/shows/query?apikey=${process.env.REACT_APP_PHISH_NET_KEY}&showids=${song.showid}&order=ASC`);
            const show = await fetchShow.json();

            return {
                'song': this.props.markedSongTitle,
                'showdate': song.showdate,
                'location': show.response.data[0].location,
                'venue': show.response.data[0].venue
            } 
        }));

        this.setState({
            markedVersions: markedRecommended.length > 0 ? markedRecommended : false,
            markedId: id
        })
    }

    // onClickHandler(songInfo, songTitle) {
    //     this.props.chosenVersion(songInfo, songTitle)
    // }
   
    onDragHandler(e) {
        e.dataTransfer.setData('text/plain', e.target.textContent);
        e.dataTransfer.setData('application/title', e.target.dataset.title);
        e.dataTransfer.setData('application/date', e.target.dataset.date);
        console.log(e.target.dataset);
    }

    render() {
        return (
            <div className="song__marked">
               <h2>Select a Version</h2>
               <p>{this.props.markedSongTitle}</p>
                {
                  !this.state.markedVersions ? <p>🤷‍♂️ &nbsp; sorry, no marked versions</p> :
                    this.state.markedVersions.map((marked, idx) => {
                        return (
                           <div
                                key={idx}
                                onDragStart={this.onDragHandler}
                                draggable="true"
                                data-title={this.props.markedSongTitle}
                                data-date={marked.showdate}
                            >
                                <p>{marked.showdate}</p>
                                <p>{marked.venue} <span> &nbsp; {marked.location} </span></p>
                           </div>
                        )
                    })
                  } 
                

            </div>
        )
    }
}