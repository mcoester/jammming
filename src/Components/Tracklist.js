import React from 'react'; 

function Tracklist(props) {
    return (
        <>
            <ul>{props.children}</ul>
            <button>Save To Spotify</button>
        </>
    )
}

export default Tracklist;