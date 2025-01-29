import React from 'react'; 

function Track({ tracks, handleRemoveClick }) {
    const trackList = tracks.map((track, index) =>{
        const artists = track.artists.map((artist, pos) => {
            if(pos < track.artists.length - 1){
                return artist.name + ', '; 
            }
            else return artist.name + ' ';
    });
        return <li><strong>Song:</strong> {track.name}<br/> <strong>Artists:</strong> {artists}<br/> <strong>Album:</strong> {track.album.name}<br/> <button onClick={() => {handleRemoveClick(index)}}>-</button></li>
    }); 
    if(tracks.length === 0){
        return <></>
    }
    return (
        <>
            {trackList}
        </>
        );
}

export default Track;