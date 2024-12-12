import React from 'react'; 

function Playlist(props){
    const changeHandler = ({ target }) => props.handleChange(target.value);

    return (
        <div>
            <input onChange={changeHandler} value={props.title} placeholder='Title' type='text' />
            {props.children}
        </div>
    );
}

export default Playlist;