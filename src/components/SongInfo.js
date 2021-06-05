import React from 'react';

export default function SongInfo(song) {
    return (
        <div>
            Song Info
            <div>{song.currentSong.title}</div>
            <div>{song.currentSong.date}</div>
            <div>{song.currentSong.venueName}</div>
            <div>{song.currentSong.venueLocation}</div>
        </div>
    )
}