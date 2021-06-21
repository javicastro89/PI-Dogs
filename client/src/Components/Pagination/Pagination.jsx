import React, { useState } from "react";

import "./Pagination.css";

function Pagination({ breedsPerPage, TotalBreeds, paginate }) {
  const [localPage, setLocalPage] = useState(1);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const pages = [];

  for (let i = 1; i <= Math.ceil(TotalBreeds / breedsPerPage); i++) {
    pages.push(i);
  }

  const handleClick = (event) => {
    paginate(event.target.value);
    setLocalPage(event.target.value);
  };

  const handleNextBtn = () => {
    paginate(localPage + 1);
    setLocalPage(localPage + 1);

    if (localPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevBtn = () => {
    paginate(localPage - 1);
    setLocalPage(localPage - 1);

    if ((localPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleHellipNext = () => {
    setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
    setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
  };

  const handleHellipPrev = () => {
    setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleHellipNext}>&hellip;</li>;
  }
  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handleHellipPrev}>&hellip;</li>;
  }

  //nuevo

  const renderPages = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          value={number}
          id={number}
          onClick={handleClick}
          className={localPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  //nuevo

  return (
    <nav className='paginationContainer'>
      <ul className="pageNumbers">
        <li>
          <button
            onClick={handlePrevBtn}
            disabled={localPage === pages[0] ? true : false}
          >
            Prev
          </button>
        </li>

        {pageDecrementBtn}
        {renderPages}
        {pageIncrementBtn}

        <li>
          <button
            onClick={handleNextBtn}
            disabled={localPage === pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
