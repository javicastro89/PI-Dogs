import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchBreeds } from "../../Actions";
import {IoSearchCircle} from 'react-icons/io5'

import './Search.css'

function Search() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch()


  const handleChange = (e) => {
    setInput(e.target.value);
    dispatch(searchBreeds(e.target.value))
  };

  return (
    <div className='divContainer'>
      <label ><IoSearchCircle className='searchIco'/> </label>
      <input
        type="text"
        id="search"
        autoComplete="off"
        value={input}
        onChange={handleChange}
        placeholder='Search...'
      />
    </div>
  );
}

export default Search;
