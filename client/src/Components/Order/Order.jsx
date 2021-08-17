import React, { useState } from "react";
import {orderByAlpha, orderByWeight, orderByLife} from './OrderFunctions'
import './Order.css'

function Order({ isFiltered, breed, setOrder }) {
  const [openOrder, setOpenOrder] = useState(false);
  const [state, setState] = useState({
      Alpha: '',
      Weight: ''
  })


  function handleOrder(event) {
    event.preventDefault();

    if (event.target.value === "false") {
      setOpenOrder(true);

    } else {

      setOpenOrder(false);
      setOrder(false)

      isFiltered.filter ? orderByAlpha(true, isFiltered.arrayFilter) : orderByAlpha(true, breed);

      setOrder(true)
      setState({
        Weight: '',
        Alpha: '',
        Life_span: ''
      })
    }
  }

  function handleChange(event) {
      
      setState({
          ...state,
          [event.target.name]: [event.target.value]
      })
    if(event.target.value === 'A-Z'){
      isFiltered.filter ? orderByAlpha(true, isFiltered.arrayFilter) : orderByAlpha(true, breed);
      setOrder(true)
      
    } else if (event.target.value === 'Z-A') {
      isFiltered.filter ? orderByAlpha(false, isFiltered.arrayFilter) : orderByAlpha(false, breed);
      setOrder(true)

    } else if (event.target.value === 'Ascendent' && event.target.name === 'Weight') {
      isFiltered.filter ? orderByWeight(true, isFiltered.arrayFilter) : orderByWeight(true, breed);
      setOrder(true)

    } else if (event.target.value === 'Descendent' && event.target.name === 'Weight') {
      isFiltered.filter ? orderByWeight(false, isFiltered.arrayFilter) : orderByWeight(false, breed);
      setOrder(true)
    }

    else if (event.target.value === 'Descendent' && event.target.name === 'Life_span'){
      isFiltered.filter ? orderByLife(false, isFiltered.arrayFilter) : orderByLife(false, breed);
      setOrder(true)
    }

    else if (event.target.value === 'Ascendent' && event.target.name === 'Life_span'){
      isFiltered.filter ? orderByLife(true, isFiltered.arrayFilter) : orderByLife(true, breed);
      setOrder(true)
    }
  }

 

  return (
    <div className='orderContainer'>
      <div className='btnContainer'>
      <button name="Order" value={openOrder} onClick={handleOrder} className='orderBtn'>
        Order
      </button>
      </div>
      {openOrder ? 
      <div className='orderActive'>
        <div className='divNames'>
      <label className='label'> Names </label>
      <select name='Alpha' onChange={handleChange} value={state.Alpha} className='select'>
          <option></option>
          <option 
          name='A-Z' 
          onChange={handleChange} 
          value='A-Z'>
            A-Z
            </option>
          <option
          name='Z-A' 
          onChange={handleChange} 
          value='Z-A'>
            Z-A
          </option>

      </select> 
      </div>

      <div className='divWeight'>
      <label className='label'> Weight </label>
      <select name='Weight' onChange={handleChange} value={state.Weight} className='select'>
          <option></option>
          <option 
          name='Ascendent' 
          onChange={handleChange} 
          value='Ascendent'>
            Ascendent
            </option>
          <option 
          name='Descendent' 
          onChange={handleChange} 
          value='Descendent'>
            Descendent
            </option>

      </select> 
      </div>

      <div className='divLifeSpan'>
      <label className='label'> Life Span </label>
      <select name='Life_span' onChange={handleChange} value={state.Life_span} className='select'>
          <option></option>
          <option 
          name='Ascendent' 
          onChange={handleChange} 
          value='Ascendent'>
            Ascendent
            </option>
          <option 
          name='Descendent' 
          onChange={handleChange} 
          value='Descendent'>
            Descendent
            </option>

      </select> 
      </div>


      </div>
      : null
      }
    </div>
  );
}

export default Order;
