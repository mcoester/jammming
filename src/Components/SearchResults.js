import React from 'react';

function SearchResults(props){
    const listArray = props.results.map((element, index) =>{
        return <li key={element.key}><strong>Song:</strong> {element.song}<br/> <strong>Artist:</strong> {element.artist}<br/> <strong>Album:</strong> {element.album}<br/> <button onClick={() => props.handleAddClick(index)} >+</button></li>
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