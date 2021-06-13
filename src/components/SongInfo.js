import React from 'react';

export default function SongInfo(song) {
    return (
        <div className="current-song__container container">
            <h2>Song Info</h2>
            <div>{song.currentSong && song.currentSong.title}</div>
            <div>{song.currentSong && song.currentSong.date}</div>
            <div>{song.currentSong && song.currentSong.venueName}</div>
            <div>{song.currentSong && song.currentSong.venueLocation}</div>
        </div>
    )
}