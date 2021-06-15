import React, { useState } from 'react'
import Pagination from '../Pagination/Pagination';

function DisplayFilter({filter}) {
    const [pageNumber, setPageNumber] = useState(1)

   // Change page
   const paginate = (event) => {
    event.preventDefault();
    setPageNumber(event.target.value);
  };

  // Get current Page
  const breedsPerPage = 8;
  const pagesVisited = breedsPerPage * (pageNumber - 1);

    return (
        <div>
            {
            filter.slice(pagesVisited, breedsPerPage + pagesVisited).map((breed) => (
                <div key={breed.id}>
                  <h4> {breed.name} </h4>
                  <h6>{breed.temperament}</h6>
                  <img src={breed.image} alt="Foto raza" className="dogPic" />
                </div>
              ))
            }
            <Pagination 
            breedsPerPage={breedsPerPage}
            TotalBreeds={filter.length}
            paginate={paginate}
            />
        </div>
    )
}

export default DisplayFilter
