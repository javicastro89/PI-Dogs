import React, { useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";
import { Link } from "react-router-dom";

function DisplaySearch() {
  const searchBreed = useSelector((state) => state.searchBreeds);
  const [pageNumber, setPageNumber] = useState(1)

   // Change page
   const paginate = (event) => {
    event.preventDefault();
    setPageNumber(event.target.value);
  };

  // Get current Page
  const breedsPerPage = 8;
  const pagesVisited = breedsPerPage * (pageNumber - 1);

  if (searchBreed === null) {
    return <h1>Breed does not exist...</h1>
  }
  return (
    <div>
      {searchBreed.slice(pagesVisited, pagesVisited + breedsPerPage).map((breed) => (
        <div key={breed.id}>
          <Link to={`/detail/${breed.id}`}>
          <h4> {breed.name} </h4>
          </Link>
          <h6>{breed.temperament}</h6>
          <img src={breed.image} alt="Foto raza" className="dogPic" />
        </div>
      ))}
      <Pagination 
      breedsPerPage={breedsPerPage}
      TotalBreeds={searchBreed.length}
      paginate={paginate}
      />
    </div>
  );
}

export default DisplaySearch;
