import React from 'react'

function Pagination({breedsPerPage, TotalBreeds, paginate}) {

    const pageNumber = []
    

    for (let i = 1; i <= Math.ceil(TotalBreeds / breedsPerPage); i++) {
        pageNumber.push(i)
    }

    return (
        <nav>
            <ul>
                {pageNumber.map(number => 
                     <button key={number} value={number} onClick={paginate}>{number}</button>
                )}
            </ul>
        </nav>
    )
}

export default Pagination
