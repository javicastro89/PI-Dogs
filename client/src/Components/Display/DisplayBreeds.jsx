import React from "react";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";

function DisplayBreeds({ pagesVisited, breedsPerPage, paginate }) {
  const breeds = useSelector((state) => state.breeds);

  return (
    <div>
       
      {breeds.slice(pagesVisited, pagesVisited + breedsPerPage).map((breed) =>
        breeds.length > 0 ? (
          <div key={breed.id}>
            <h4> {breed.name} </h4>
            <h6>{breed.temperament}</h6>
            <img src={breed.image} alt="Foto raza" className="dogPic" />
          </div>
        ) : (
          <h1>Cargando...</h1>
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
