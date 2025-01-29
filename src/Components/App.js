import '../App.css';
import SearchBar from './SearchBar.js';
import React, { useState } from 'react';
import SearchResults from './SearchResults.js';
import Playlist from './Playlist.js';
import Tracklist from './Tracklist.js';
import Track from './Track.js';
import spotifyConnection from './SpotifyConnection.js';


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
      return [...prev, results[index]];   
    });
  }

  function handleRemoveClick(index){
    setTracks((prev) => {
      return prev.filter((_, i) => i !== index);
    });
  }

  async function getTracks(url){
    try {
      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${accessValues.access_token}`,
          "Content-Type": "application/json", //Für den Fall das die Anfrage abgelehnt wird gibt das Programm einen error aus und es ist kein zugriff auf access_token möglich. Dieser Fall muss noch eingebaut werden!
        },
      });
      if(response.ok){
        const jsonResponse = await response.json();
        console.log(jsonResponse); //hier Json-Daten weiter verarbeiten!
        setResults(jsonResponse.tracks.items); // an dieser Stelle fehlt noch das hinzufügen einer Möglichkeit des weiterblätterns zur nächsten Seite
        console.log(results);
      } else {
        throw new Error('Request failed!');
      }
    } catch(e){
      console.log(e);
    }
  }

  function handleClick(){
    const searchQuery = encodeURIComponent(search);
    let fetchUrl = `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&market=DE&limit=5&offset=0`;
    getTracks(fetchUrl);
    /*let id = 0;
    
    const newDataArray = data.filter(element =>{
      return (element.song.toLowerCase() === search.toLowerCase() || element.artist.toLowerCase() === search.toLowerCase() || element.album.toLowerCase() === search.toLowerCase());
    });
    newDataArray.map(songObject =>{
      songObject.key = id++;
      return songObject;
    });
    setResults(newDataArray);*/
  }

  async function fetchUsersProfile(){
    let userId;
    const url = 'https://api.spotify.com/v1/me'
    try{
      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${accessValues.access_token}`,
          "Content-Type": "application/json",
        }
      });
      if(response.ok){
        const jsonResponse = await response.json();
        userId = jsonResponse.id;
        console.log(userId);
      } else {
          throw new Error('Request failed');
      }
    } catch(e){
      console.log(e);
    }
    return userId;
  }

  async function createPlayList(){
    let playListId;
    let userId = await fetchUsersProfile();
    const requestBody = {
      "name": listName,
    };
    userId = encodeURIComponent(userId);
    const fetchUrl = 'https://api.spotify.com/v1/users/' + userId + '/playlists'
    try{
      const response = await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${accessValues.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if(response.ok){
      const jsonResponse = await response.json();
      playListId = jsonResponse.id;
    } else {
      throw new Error('Post Request failed!');
    }} catch (e){
      console.log(e);
    }
    return playListId;
  }

  async function addTracksToPlayList(){
    let playListId = await createPlayList();
    let snapShotId;
    playListId = encodeURIComponent(playListId);
    const tracksUris = tracks.map(track =>{
      return track.uri;
    });
    const requestBody = {
      "uris": tracksUris,
    }
    const url = 'https://api.spotify.com/v1/playlists/' + playListId + '/tracks'
    try{
      const response = await fetch(url,{
        method: 'POST',
        headers:{
        "Authorization": `Bearer ${accessValues.access_token}`,
        "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if(response.ok){
        const jsonResponse = await response.json();
        snapShotId = jsonResponse.snapShot_id;
      } else {
        throw new Error('Add Track to Playlist-Request failed!');
      }} catch(e){
        console.log(e);
      }
    return snapShotId;
    }
  

  const handleSaveToSpotify = () =>{
    addTracksToPlayList();
  }

  return (
    <>
      <SearchBar search={search} handleChange={handleSearchChange} handleClick={handleClick} />
      <SearchResults results={results} handleAddClick={handleAddClick} />
      <Playlist title={listName} handleChange={handleListChange}>
        <Tracklist saveToSpotify={handleSaveToSpotify}>
          <Track tracks={tracks} handleRemoveClick={handleRemoveClick} />
        </Tracklist>
      </Playlist>
    </>
  );
}


export default App;
