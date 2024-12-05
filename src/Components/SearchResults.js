import React from 'react';

function SearchResults(props){
    return (
        <ul>
            {props.results}
        </ul>
    );
}

export default SearchResults;