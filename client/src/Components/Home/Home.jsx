import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreeds } from "../../Actions";
import Search from "../Search/Search";
import DisplayBreeds from "../Display/DisplayBreeds";
import DisplaySearch from "../Display/DisplaySearch";
import Filter from "../Filters/Filter";
import DisplayFilter from "../Display/DisplayFilter";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const searchBreed = useSelector((state) => state.searchBreeds);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFiltered, setIsFiltered] = useState({
    filter: false,
    arrayFilter: []
  })

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
  console.log(isFiltered.filter)
  if(isFiltered.filter) {
    return (
      <div>
        <Search />
        <Filter setIsFiltered={setIsFiltered} isFiltered={isFiltered}/>
        <DisplayFilter filter={isFiltered.arrayFilter} />
      </div>
    )
  }
  if (searchBreed.length > 0) {
    return (
      <div>
        <Search />
        <Filter setIsFiltered={setIsFiltered} isFiltered={isFiltered} />
        <DisplaySearch />
      </div>
    );
  } else {
    return (
      <div>
        <Search />
        <Filter setIsFiltered={setIsFiltered} isFiltered={isFiltered} />
        <DisplayBreeds
          pagesVisited={pagesVisited}
          breedsPerPage={breedsPerPage}
          paginate={paginate}
        />
      </div>
    );
  }

}

export default Home;
