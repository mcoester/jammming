import '../App.css';
import SearchBar from './SearchBar.js';
import React, { useState } from 'react';
import SearchResults from './SearchResults.js';
import Playlist from './Playlist.js';
import Tracklist from './Tracklist.js';
import Track from './Track.js';
import spotifyConnection from './SpotifyConnection.js';

const data = [
  {
      song: "Don't matter",
      artist: 'Akon',
      album: 'Konvicted'
  },
  {
      song: 'Smack that',
      artist: 'Akon',
      album: 'Konvicted'
  },
  {
      song: 'Lose Yourself',
      artist: 'Eminem',
      album: '8 Mile'
  }
]

const accessValues = spotifyConnection.getAccessToken();
if(accessValues){
    setTimeout(() =>{
        alert('Bitte aktualisiere die Seite um einen neuen Spotify-Authentifizierungscode zu erhalten.');
    },  3600 * 1000)
};
  if(!accessValues){
    spotifyConnection.connectWithSpotifyAuth();
  }

  console.log(accessValues.access_token);

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [listName, setListName] = useState("");
  const [tracks, setTracks] = useState([]);
  
  function handleSearchChange(searchEntry){
    setSearch(searchEntry);
  }

  function handleListChange(listEntry){
    setListName(listEntry);
  }

  function handleAddClick(index){
    setTracks(prev => {
      return[...prev, results[index]];   
    });
  }

  function handleRemoveClick(index){
    setTracks((prev) => {
      return prev.filter((_, i) => i !== index);
    });
  }

  function handleClick(){

    let id = 0;
    
    const newDataArray = data.filter(element =>{
      return (element.song.toLowerCase() === search.toLowerCase() || element.artist.toLowerCase() === search.toLowerCase() || element.album.toLowerCase() === search.toLowerCase());
    });
    newDataArray.map(songObject =>{
      songObject.key = id++;
      return songObject;
    });
    setResults(newDataArray);
  }

  return (
    <>
      <SearchBar search={search} handleChange={handleSearchChange} handleClick={handleClick} />
      <SearchResults results={results} handleAddClick={handleAddClick} />
      <Playlist title={listName} handleChange={handleListChange}>
        <Tracklist>
          <Track tracks={tracks} handleRemoveClick={handleRemoveClick} />
        </Tracklist>
      </Playlist>
    </>
  );
}


export default App;
