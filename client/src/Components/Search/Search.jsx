import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchBreeds } from "../../Actions";
import {IoSearchCircle} from 'react-icons/io5'

import './Search.css'
import { localSearch } from "./LocalSearch";

function Search({setSearching}) {
  const [input, setInput] = useState("");
  const dispatch = useDispatch()
  const [on, setOn] = useState(false)
  const breeds = useSelector(state => state.breeds)


  const handleChange = (e) => {
    setInput(e.target.value);
    setSearching(true)
  };

  useEffect(() => {
    if(!on) {
    
      dispatch(searchBreeds(input))
    }
  }, [dispatch, input, on])

  useEffect(() => {
    if(on) {
      dispatch(localSearch(input, breeds))
    }
  }, [on, input, breeds, dispatch])

  useEffect(() => {
    if(input === '') {
      setSearching(false)
    }
  }, [setSearching, input])

  function handleSearch() {
    setOn(!on)
    if(on && input !== '') {
      setSearching(true)
    } else {
      setSearching(false)
    }
  }


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
      <div className="switch-button">
    {/* <!-- Checkbox --> */}
    <input value={on} onChange={handleSearch} type="checkbox" name="switch-button" id="switch-label" className="switch-button__checkbox"/>
    {/* <!-- Botón --> */}
    <label htmlFor="switch-label" className="switch-button__label"></label>
    </div>
    <label className='fastSearch'>Faster Search</label>
    </div>
  );
}

export default Search;
