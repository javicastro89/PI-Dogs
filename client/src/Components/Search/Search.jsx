import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchBreeds } from "../../Actions";

function Search() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch()


  const handleChange = (e) => {
    setInput(e.target.value);
    dispatch(searchBreeds(e.target.value))
  };

  return (
    <div>
      <label>Search: </label>
      <input
        type="text"
        id="search"
        autoComplete="off"
        value={input}
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
