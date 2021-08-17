import React from 'react'
import Pagination from '../Pagination/Pagination'
import { useHistory } from 'react-router'

import './Display.css'

export default function Dislpay({ pagesVisited, breedsPerPage, paginate, breeds }) {
  const history = useHistory()

  function handleSubmit(event) {
    event.preventDefault()
    history.push(`/detail/${event.target.value}`)
  }

    return (
        <div className='backgroundBox'>
              {breeds.slice(pagesVisited, pagesVisited + breedsPerPage).map((breed) =>
         (
          <div key={breed.id} className='dogBox'>
            <div className='linkContainer'>
            <h4 className='link'>
             {breed.name} 
            </h4>
            </div>
            <img src={breed.image} alt="Breed" className="dogPic" />
            <h6 className='temp'>{breed.temperament}</h6>
            <button onClick={handleSubmit} value={breed.id} className='buttonDetail'> Detail </button>
          </div>
        ) 
      )}
       <Pagination
      breedsPerPage={breedsPerPage}
      TotalBreeds={breeds.length}
      paginate={paginate}
    />
        </div>
    )
}
