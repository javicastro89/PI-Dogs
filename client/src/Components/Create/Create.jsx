import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  addBreed, getTemperament, getBreeds } from "../../Actions/index";
import { validate } from "./Validate";
import { useHistory } from "react-router";
import './Create.css'

function Create({setCreate}) {
  const dispatch = useDispatch();
  const stateTemp = useSelector(state => state.temperament);
  const breeds = useSelector(state => state.breeds)
  let [temp, setTemp] = useState("");
  const [error, setError] = useState({error: 'error'})
  const [submit, setSubmit] = useState(false)
  let history = useHistory()
  

  const [input, setInput] = useState({
    name: "",
    temperament: [],
    weight: "",
    height: "",
    life_span: "",
    description: "",
  });


  const handleInput = (event) => {
    setError(
      validate({
        ...input,
        [event.target.name]: event.target.value
      }, breeds)
    )
    if (event.target.name !== "temperament") {
      
      setInput({
        ...input,
        [event.target.name]: event.target.value,
      });
    } else if (event.target.name === "temperament") {
      setTemp(event.target.value);
      
    }
  };


  const handleTemp = (event) => {
    event.preventDefault();
    if (temp !== "") {
      if (!input.temperament.find((e) => e === temp)) {
        input.temperament.push(temp)
        // setInput({
        //   ...input,
        //   temperament: [...input.temperament, temp],
        // });
        setTemp("");
      }
    }
  };


  const eraseTemp = (event) => {
    event.preventDefault();
    let localTemp = input.temperament.filter((e) => e !== event.target.value);
    setInput({
      ...input,
      temperament: localTemp,
    });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
      setCreate(true)
      dispatch(addBreed(input));
      setInput({
        name: "",
        temperament: [],
        weight: "",
        height: "",
        life_span: "",
        description: "",
      });
      setError(
        validate({
          ...input,
          temperament: []
        }, breeds))
        history.push('/home')
  };


  useEffect(() => {
    dispatch(getBreeds())
    dispatch(getTemperament())
    
  }, [dispatch])

  
  useEffect(() => {
    if(Object.values(error).length === 0) {
      setSubmit(true)
    } else {
      setSubmit(false)
    }
  }, [error])


  useEffect(() => {
    if(input.name !== '' ) {
      if(input.temperament.length === 0) {
        setError(
          validate({
            ...input,
            temperament: []
          }, breeds)
        )
      } else {
        setError(
          validate({
            ...input,
            temperament: input.temperament
          }, breeds)
        )
      }

    }
  }, [input, breeds])


  return (
    <div className='container'>
    <form onSubmit={handleSubmit} className='form'>
      <div>
        <p>Breed name</p>
        <input
          className={error.name ? 'danger' : 'input'}
          type="text"
          name="name"
          placeholder="Breed.."
          value={input.name}
          onChange={handleInput}
        />
        {error.name && <p className='danger'>{error.name}</p>}
      </div>

      <div className='fullTempContainer'>
        <div>Temperament</div>
        <div>
          <select 
          name="temperament"
          onChange={handleInput} 
          value={temp} 
          className={error.temperament ? 'danger' : 'select'}>
            <option></option>
            {stateTemp.map((e) => (
              <option 
              name="temperament" 
              key={e.name} 
              onChange={handleInput}>
                {e.name}
              </option>
            ))}
          </select>
        <button onClick={handleTemp} className='addBtn' data-tooltip='Add'>+</button>
          </div>
          {error.temperament && <p className='danger'>{error.temperament}</p>}     
        <div className='selectedTemp'>
          {input.temperament.length > 0
            ? input.temperament.map((e, index) => (
                <div key={e} className='tempContainer'>
                  {index % 2 !== 0 ? 
                  <>
                  <h6 className='tempSelect'> {e} </h6>
                  <button onClick={eraseTemp} value={e} data-tooltip='Delete'>
                    x
                  </button> 
                  </>
                  : 
                  <>
                  <button onClick={eraseTemp} value={e} data-tooltip='Delete'>
                    x
                  </button> 
                  <h6 className='tempSelect'> {e} </h6>
                  </>
                  }
                </div>
              ))
            : <p></p>}
        </div>
      </div>

      <div>
        <p>Average weight</p>
        <input
          className={error.weight ? 'danger' : 'input'}
          type="number"
          name="weight"
          placeholder="Weight in kg..."
          value={input.weight}
          onChange={handleInput}
        />
        {error.weight && <p className='danger'>{error.weight}</p>}
      </div>

      <div>
        <p>Average height</p>
        <input
          className={error.height ? 'danger' : 'input'}
          type="number"
          name="height"
          placeholder="Height in cm..."
          value={input.height}
          onChange={handleInput}
        />
        {error.height && <p className='danger'>{error.height}</p>}
      </div>

      <div>
        <p>Life span</p>
        <input
          className={error.life_span ? 'danger' : 'input'}
          type="number"
          name="life_span"
          placeholder="Life span..."
          value={input.life_span}
          onChange={handleInput}
        />
        {error.life_span && <p className='danger'>{error.life_span}</p>}
      </div>

      <div>
        <p>Description</p>
        <textarea
          className='inputTarea'
          value={input.description}
          name="description"
          placeholder='Description...'
          onChange={handleInput}
        />
      </div>
      <input type="submit" value="Crear" disabled={!submit} />
    </form>
    </div>
  );
}

export default Create;
