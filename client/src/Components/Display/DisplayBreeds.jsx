import React from "react";
import Pagination from "../Pagination/Pagination";
import { Link } from "react-router-dom";

function DisplayBreeds({ pagesVisited, breedsPerPage, paginate, breeds }) {
  
  
  return (
    <div>
       
      {breeds.slice(pagesVisited, pagesVisited + breedsPerPage).map((breed) =>
         (
          <div key={breed.id}>
            <Link to={`/detail/${breed.id}`}>
            <h4> {breed.name} </h4>
            </Link>
            <h6>{breed.temperament}</h6>
            <img src={breed.image} alt="Foto raza" className="dogPic" />
          </div>
        ) 
      )}
       <Pagination
      breedsPerPage={breedsPerPage}
      TotalBreeds={breeds.length}
      paginate={paginate}
    />
        
    </div>
  );
}

export default DisplayBreeds;
