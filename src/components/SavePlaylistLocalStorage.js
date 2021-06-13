const SavePlaylistLocalStorage = (playList) => {
    localStorage.setItem('localStoragePlaylist', JSON.stringify(playList));
}

export default SavePlaylistLocalStorage;