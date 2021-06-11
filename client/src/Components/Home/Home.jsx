import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreeds } from "../../Actions";
import Pagination from "./Pagination";
import './Home.css'

function Home() {
  const dispatch = useDispatch();
  const breeds = useSelector((state) => state.breeds);
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    dispatch(getBreeds());
  }, [dispatch]);


  // Get current Breeds
  const breedsPerPage = 8
  const pagesVisited = breedsPerPage * (pageNumber - 1)
  const displayBreeds = breeds.slice(pagesVisited, pagesVisited + breedsPerPage).map(breed => 
    breeds.length > 1 ?  
        
        <div key={breed.id}>
          <h4 key={breed.id}> {breed.name} </h4> 
          <h6>{breed.temperament}</h6>
          <img src={breed.image} alt='Foto raza'/>
        </div>
      
    : <h1>Cargando...</h1>
  )
  
  // Change page
  const paginate = (event) =>{
    event.preventDefault()
    setPageNumber(event.target.value)
  }

  return (
    <div>
      {displayBreeds}
      <Pagination breedsPerPage={breedsPerPage} TotalBreeds={breeds.length} paginate={paginate} />
    </div>
  );
}

export default Home;
