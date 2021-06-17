import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTemperament } from "../../Actions";

function Filter({ setIsFiltered, isFiltered }) {
  const dispatch = useDispatch();
  const breeds = useSelector((state) => state.breeds);
  const temperament = useSelector((state) => state.temperament);

  const [state, setState] = useState({
    temp: "",
    breed: "",
  });
  const [filter, setFilter] = useState(false);
  let [tempFilter, setTempFilter] = useState([])

  function filterByTemperament(tempFilter) {
    if(tempFilter.length === 0) {
      return false
    }

    if (breeds.length > 0) {
      let filteredTemp = breeds.filter((objBreed) => {

        if (objBreed.temperament) {
          objBreed.temperament.split(", ");
          let flag = true
          for(let i of tempFilter) {

            if(!objBreed.temperament.includes(i)) {
              flag = false
              break
            }
          }

          if(flag){
            return objBreed
          }
        }
        return null;
      });
      return filteredTemp.filter((e) => e !== null);
    }
  }

  function filterByBreed(breed) {
    if (isFiltered.arrayFilter.length > 0) {
      return isFiltered.arrayFilter.filter(objBreed => objBreed.name === breed);
    }
    return breeds.filter((objBreed) => objBreed.name === breed);
  }

  function handleChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });

    if (event.target.value !== "") {
      let find = temperament.find((e) => e.name === event.target.value);

      if (find) {
        tempFilter.push(find.name)
        let newFilter = filterByTemperament(tempFilter)
        setIsFiltered({
          filter: true,
          arrayFilter: newFilter,
        });

      } else {
        let newFilter = filterByBreed(event.target.value);
        setIsFiltered({
          filter: true,
          arrayFilter: newFilter,
        });
      }

    } 
    else if (event.target.name === 'breed') {
      let flag = filterByTemperament(tempFilter)
      if (!flag) {
        setIsFiltered({
          filter: false,
          arrayFilter: []
        });
      } else {
        setIsFiltered({
          filter: true,
          arrayFilter: flag
        });
      }
    }
  }

  function handleFilter(event) {
    event.preventDefault();

    if (event.target.value === "false") {
      setFilter(true);

    } else {
      setFilter(false);
      setState({
        temp: "",
        breed: "",
      })
      setIsFiltered({
        filter: false,
        arrayFilter: []
      });
      setTempFilter([])
    }
  }

  function eraseTemp(event) {
    event.preventDefault()
    
    let intermediate = tempFilter.filter(e => e !== event.target.value)
    setTempFilter(intermediate)
    
    if (intermediate.length > 0) {
      let newFilter = filterByTemperament(intermediate)
      setIsFiltered({
        filter: true,
        arrayFilter: newFilter
      })
    
    } else {
      setIsFiltered({
        filter: false,
        arrayFilter: []
      })
    }
  }

  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);


  return (
    <div>
      <button name="Filter" value={filter} onClick={handleFilter}>
        Filter
      </button>

      {filter ? (

        <>
          <label>Temperament</label>

          <select name="temp" onChange={handleChange} value={state.temp}>
            <option></option>
            
            {Array.isArray(temperament) ? 
            temperament.map(e => 
              <option
              name="temperament"
              key={e.name}
              onChange={handleChange}
            >
              {e.name}
            </option>
            )
            : <h1>Cargando...</h1>
          }

          </select>

          {tempFilter.length > 0 ?
          tempFilter.map(e => 
            <label key={e}>
                  <label> {e} </label>
                  <button onClick={eraseTemp} value={e}>
                    x
                  </button>
                </label>
            )

          : <label></label>}
        
          <label>Breed</label>

          <select name="breed" onChange={handleChange} value={state.breed}>
            <option></option>

            {isFiltered.arrayFilter.length < 1

              ? breeds.map((e) => (
                  <option name="breed" key={e.id} onChange={handleChange}>
                    {e.name}
                  </option>
                ))

              : isFiltered.arrayFilter.map((e) => (

                  <option name="breed" key={e.id} onChange={handleChange}>
                    {e.name}
                  </option>

                ))}

          </select>
        </>
      ) : null}
    </div>
  );
}

export default Filter;
