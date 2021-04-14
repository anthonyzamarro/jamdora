import React from 'react';


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
                this.filterMarkedSongs(json.response.data.entries, this.props.markedSongId)
            }
        }
    }

    filterMarkedSongs(songs, id) {
        const markedRecommended = songs.filter(song => song.marked_recommended > 0)
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
                           <p 
                                key={idx}
                                onDragStart={this.onDragHandler}
                                draggable="true"
                                data-title={this.props.markedSongTitle}
                            >
                                {
                                    marked.showdate
                                }
                           </p>
                        )
                    })
                  } 
                

            </div>
        )
    }
}