import React, { useState } from "react";
// import { useSelector } from "react-redux";

function Order({ isFiltered, breed, setOrder, order }) {
//   const breed = useSelector((state) => state.breeds);
  const [openOrder, setOpenOrder] = useState(false);
  const [state, setState] = useState({
      Alpha: '',
      Ascendent: ''
  })

  function orderByAlpha(Alpha) {
    
    if (isFiltered.filter) {
      if (Alpha) {
        for (let i = 0; i < isFiltered.arrayFilter.length - 1; i++) {
          for (let j = i + 1; j < isFiltered.arrayFilter.length; j++) {
            if (isFiltered.arrayFilter[i].name.toLowerCase() > isFiltered.arrayFilter[j].name.toLowerCase()) {
              [isFiltered.arrayFilter[i], isFiltered.arrayFilter[j]] = [isFiltered.arrayFilter[j], isFiltered.arrayFilter[i]];
            }
          }
        }
        
      } else {
        for (let i = 0; i < isFiltered.arrayFilter.length - 1; i++) {
          for (let j = i + 1; j < isFiltered.arrayFilter.length; j++) {
            if (isFiltered.arrayFilter[i].name.toLowerCase() < isFiltered.arrayFilter[j].name.toLowerCase()) {
              [isFiltered.arrayFilter[i], isFiltered.arrayFilter[j]] = [isFiltered.arrayFilter[j], isFiltered.arrayFilter[i]];
            }
          }
        }
      }
      
    } else if (Alpha) {
      for (let i = 0; i < breed.length - 1; i++) {
        for (let j = i + 1; j < breed.length; j++) {
          if (breed[i].name.toLowerCase() > breed[j].name.toLowerCase()) {
            [breed[i], breed[j]] = [breed[j], breed[i]];
          }
        }
      }
      
    } else {
      for (let i = 0; i < breed.length - 1; i++) {
        for (let j = i + 1; j < breed.length; j++) {
          if (breed[i].name.toLowerCase() < breed[j].name.toLowerCase()) {
            [breed[i], breed[j]] = [breed[j], breed[i]];
          }
        }
      }
    }
    setOrder(true)
  }

  function handleOrder(event) {
    event.preventDefault();

    if (event.target.value === "false") {
      setOpenOrder(true);
    } else {
      setOpenOrder(false);
      console.log('Me estoy yendo')
      setOrder(false)
      orderByAlpha(true)
      setState({
        ...state,
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
        orderByAlpha(true)
    } else if (event.target.value === 'Z-A') {
      orderByAlpha(false)
    }
  }

 

  return (
    <div>
      <button name="Order" value={openOrder} onClick={handleOrder}>
        Order
      </button>
      {openOrder ? 
      <>
      <label>names</label>
      <select name='Alpha' onChange={handleChange} value={state.Alpha}>
          <option></option>
          <option name='A-Z' onChange={handleChange} value='A-Z'>A-Z</option>
          <option name='Z-A' onChange={handleChange} value='Z-A'>Z-A</option>

      </select> 
      </>
      : null
      }
    </div>
  );
}

export default Order;
