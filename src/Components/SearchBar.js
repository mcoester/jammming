import React from 'react'; 

function SearchBar({ search, handleChange, handleClick }){
    function changeHandler({ target }){
        handleChange(target.value);
    }

    return (
        <>
            <input placeholder='Search' value={search} onChange={changeHandler}/>
            <button onClick={handleClick} >Search</button>
        </>
    )
}

export default SearchBar;
