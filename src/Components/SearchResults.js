import React from 'react';

function SearchResults(props){
    const listArray = props.results.map((element, index) =>{
        const artists = element.artists.map((artist, pos) => {
            if(pos < element.artists.length - 1){
                return artist.name + ', '; 
            }
            else return artist.name + ' ';
    });
        //hier fehlt noch ein key für die list-elemente damit React die elemente einfacher verwalten kann
        return <li><strong>Song:</strong> {element.name}<br/> <strong>Artists:</strong> {artists}<br/> <strong>Album:</strong> {element.album.name}<br/> <button onClick={() => props.handleAddClick(index)} >+</button></li>
    });
    return (
        <div>
            <h2>Results</h2>
            <ul>
                {listArray}
            </ul>
        </div>
    );
}

export default SearchResults;