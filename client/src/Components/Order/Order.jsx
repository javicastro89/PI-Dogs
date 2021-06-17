import React, { useState } from "react";
import {orderByAlpha, orderByWeight} from './OrderFunctions'

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
        Alpha: ''
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

    } else if (event.target.value === 'Ascendent') {
      isFiltered.filter ? orderByWeight(true, isFiltered.arrayFilter) : orderByWeight(true, breed);
      setOrder(true)

    } else if (event.target.value === 'Descendent') {
      isFiltered.filter ? orderByWeight(false, isFiltered.arrayFilter) : orderByWeight(false, breed);
      setOrder(true)
    }
  }

 

  return (
    <div>
      <button name="Order" value={openOrder} onClick={handleOrder}>
        Order
      </button>
      {openOrder ? 
      <>
      <label> Names </label>
      <select name='Alpha' onChange={handleChange} value={state.Alpha}>
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
      <label> Weight </label>
      <select name='Weight' onChange={handleChange} value={state.Weight}>
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
      </>
      : null
      }
    </div>
  );
}

export default Order;
