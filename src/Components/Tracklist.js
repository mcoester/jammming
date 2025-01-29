import React from 'react'; 

function Tracklist(props) {
    return (
        <>
            <ul>{props.children}</ul>
            <button onClick={props.saveToSpotify}>Save To Spotify</button>
        </>
    )
}

export default Tracklist;