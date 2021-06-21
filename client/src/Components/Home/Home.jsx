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
  
  

  // Change page
  const paginate = (event) => {
    // event.preventDefault();
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
      console.log('Is filtered chango')
        arrayToShow = isFiltered.arrayFilter
    }
    if (searchBreed !== null && searchBreed.length > 0) {
        arrayToShow = searchBreed
    }
    
      return (
        <div className='primaryDiv'>
          <Search />
          <Filter setIsFiltered={setIsFiltered} isFiltered={isFiltered}/>
          <Order isFiltered={isFiltered} breed={arrayToShow} setOrder={setOrder}/>

          {searchBreed === null ? <h1>Breed does not exist</h1> : <Dislpay 
          pagesVisited={pagesVisited}
          breedsPerPage={breedsPerPage}
          paginate={paginate}
          pageNumber={pageNumber}
          breeds={arrayToShow} />}
        </div>
      )
    //  if (searchBreed === null) {
      
    //   return (
    //     <div>
    //        <Search />
    //       <Filter setIsFiltered={setIsFiltered} isFiltered={isFiltered} />
    //       <Order isFiltered={isFiltered} breed={breed} setOrder={setOrder}/>
    //       <h1>Breed does not exist...</h1>
    //     </div>
    //     )
    // }
    //   if (searchBreed !== null && searchBreed.length > 0) {
        
    //   return (
    //     <div>
    //       <Search />
    //       <Filter setIsFiltered={setIsFiltered} isFiltered={isFiltered} />
    //       <Order isFiltered={isFiltered} breed={breed} setOrder={setOrder}/>
    //       <DisplaySearch />
    //     </div>
    //   );
    
    // }
    // else {
    //   return (
    //     <div>
    //       <Search />
    //       <Filter setIsFiltered={setIsFiltered} isFiltered={isFiltered} />
    //       <Order isFiltered={isFiltered} breed={breed} setOrder={setOrder} />
    //       <DisplayBreeds
    //         breeds={breed}
    //         pagesVisited={pagesVisited}
    //         breedsPerPage={breedsPerPage}
    //         paginate={paginate}
    //       />
    //     </div>
    //   );
    // }

  } else {
    return (
      <h1 className='loading'>
        Loading...
      </h1>
    )
  }

}

export default Home;
