import '../App.css';
import SearchBar from './SearchBar.js';
import React, { useState, useEffect } from 'react';
import SearchResults from './SearchResults.js';

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

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  
  function handleChange(searchEntry){
    setSearch(searchEntry);
  }

  function handleClick(){
    console.log(search);
    const newDataArray = data.filter(element =>{
      return (element.song.toLowerCase() === search.toLowerCase() || element.artist.toLowerCase() === search.toLowerCase() || element.album.toLowerCase() === search.toLowerCase());
    });
    console.log(newDataArray);
    const newListArray = newDataArray.map(element =>{
      return <li><strong>Song:</strong> {element.song}<br/> <strong>Artist:</strong> {element.artist}<br/> <strong>Album:</strong> {element.album}<br/> </li>
    });
    setResults(newListArray);
  }

  return (
    <>
      <SearchBar search={search} handleChange={handleChange} handleClick={handleClick} />
      <SearchResults results={results} />
    </>
  );
}

export default App;
