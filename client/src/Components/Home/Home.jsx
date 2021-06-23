import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreeds } from "../../Actions";
import Search from "../Search/Search";
import Filter from "../Filters/Filter";
import Order from "../Order/Order";
import Dislpay from "../Display/Dislpay";

import "./Home.css";

function Home({create, setCreate}) {
  const dispatch = useDispatch();
  const breeds = useSelector(state => state.breeds)
  const searchBreed = useSelector((state) => state.searchBreeds);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFiltered, setIsFiltered] = useState({
    filter: false,
    arrayFilter: []
  })
  const [order, setOrder] = useState(false);
  const [searching, setSearching] = useState(false)
  
  

  // Change page
  const paginate = (event) => {
    setPageNumber(event);
  };

  // Get current Page
  const breedsPerPage = 8;
  const pagesVisited = breedsPerPage * (pageNumber - 1);

  useEffect(() => {
    dispatch(getBreeds());
  }, [dispatch]);

 useEffect(() => {
   if(create) {
     dispatch(getBreeds())
   }
   return () => setCreate(false)
 }, [create, dispatch, setCreate])


  useEffect(() => {
    return () => setOrder(false)
  }, [order])

  
  let arrayToShow
  
  if (breeds.length > 0) {
      arrayToShow = breeds

    if(isFiltered.filter) {
      arrayToShow = isFiltered.arrayFilter
    }

    if (searching && searchBreed !== null &&  searchBreed.length > 0) {
      arrayToShow = searchBreed
        
    }
    
      return (
        <div className='primaryDiv'>
          <Search setSearching={setSearching} />
          <Filter setIsFiltered={setIsFiltered} isFiltered={isFiltered}/>
          <Order isFiltered={isFiltered} breed={arrayToShow} setOrder={setOrder}/>

          {searchBreed === null ? <h1 className='loading'>Breed does not exist</h1> : <Dislpay 
          pagesVisited={pagesVisited}
          breedsPerPage={breedsPerPage}
          paginate={paginate}
          pageNumber={pageNumber}
          breeds={arrayToShow} />}
        </div>
      )

  } else {
    return (
      <h1 className='loading'>
        Loading...
      </h1>
    )
  }

}

export default Home;
