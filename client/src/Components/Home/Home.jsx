import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreeds } from "../../Actions";
import Search from "../Search/Search";
import DisplayBreeds from "../Display/DisplayBreeds";
import DisplaySearch from "../Display/DisplaySearch";
import Filter from "../Filters/Filter";
import DisplayFilter from "../Display/DisplayFilter";
import Order from "../Order/Order";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const breeds = useSelector(state => state.breeds)
  const searchBreed = useSelector((state) => state.searchBreeds);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFiltered, setIsFiltered] = useState({
    filter: false,
    arrayFilter: []
  })
  const [breed, setBreed] = useState(breeds)
  const [order, setOrder] = useState(false);
  

  // Change page
  const paginate = (event) => {
    event.preventDefault();
    setPageNumber(event.target.value);
  };

  // Get current Page
  const breedsPerPage = 8;
  const pagesVisited = breedsPerPage * (pageNumber - 1);

  useEffect(() => {
    dispatch(getBreeds());
  }, [dispatch]);

  useEffect(() => {
    setBreed(breeds)
    return () => setOrder(false)
  }, [breeds, order])
  

  if (breed.length > 0) {
    if(isFiltered.filter) {
      
      return (
        <div>
          <Search />
          <Filter setIsFiltered={setIsFiltered} isFiltered={isFiltered}/>
          <Order isFiltered={isFiltered} breed={breed} setOrder={setOrder}/>
          <DisplayFilter filter={isFiltered.arrayFilter} />
        </div>
      )
    }
    if (searchBreed.length > 0) {
      return (
        <div>
          <Search />
          <Filter setIsFiltered={setIsFiltered} isFiltered={isFiltered} />
          <Order isFiltered={isFiltered} breed={breed} setOrder={setOrder}/>
          <DisplaySearch />
        </div>
      );
    } else {
      return (
        <div>
          <Search />
          <Filter setIsFiltered={setIsFiltered} isFiltered={isFiltered} />
          <Order isFiltered={isFiltered} breed={breed} setOrder={setOrder} order={order} />
          <DisplayBreeds
            breeds={breed}
            pagesVisited={pagesVisited}
            breedsPerPage={breedsPerPage}
            paginate={paginate}
          />
        </div>
      );
    }

  } else {
    return (
      <h1>
        Loading...
      </h1>
    )
  }

}

export default Home;
