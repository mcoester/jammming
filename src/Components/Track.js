import React from 'react'; 

function Track({ tracks, handleRemoveClick }) {
    if(tracks.length === 0){
        return <></>
    }
    const tracksCopy = tracks.map((track, index) => ({
        ...track,
        key: index ,
    }));
    return tracksCopy.map((track, index) =>{
        return <li key={track.key}><strong>Song:</strong>{track.song}<br/> <strong>Artist</strong>{track.artist}<br/><strong>Album</strong>{track.album}<button onClick={() =>{handleRemoveClick(index)}}>-</button></li>
    })
}

export default Track;