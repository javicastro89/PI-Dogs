import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  addBreed, getTemperament, getBreeds } from "../../Actions/index";
import { validate } from "./Validate";

function Create() {
  const dispatch = useDispatch();
  const stateTemp = useSelector(state => state.temperament);
  const breeds = useSelector(state => state.breeds)
  let [temp, setTemp] = useState("");
  const [error, setError] = useState({error: 'error'})
  const [submit, setSubmit] = useState(false)

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
    // input.temperament = localTemp
    // console.log(localTemp)
    // console.log(input.temperament)
    setInput({
      ...input,
      temperament: localTemp,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      input.name !== "" &&
      input.temperament.length > 0 &&
      input.weight > 5 &&
      input.height > 10 &&
      input.life_span > 1
    ) {
      dispatch(addBreed(input));
      setInput({
        name: "",
        temperament: [],
        weight: "",
        height: "",
        life_span: "",
        description: "",
      });
    } else {
      return <h1>Wrong !!</h1>
    }
    
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
  // console.log(Object.values(input))
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre de la raza: </label>
        <input
          type="text"
          name="name"
          placeholder="Raza..."
          value={input.name}
          onChange={handleInput}
        />
        {error.name && <p>{error.name}</p>}
      </div>

      <div>
        <label>Temperamento: </label>
      
          <select name="temperament" onChange={handleInput} value={temp}>
            <option></option>
            {stateTemp.map((e) => (
              <option name="temperament" key={e.name} onChange={handleInput}>
                {e.name}
              </option>
            ))}
          </select>
        <button onClick={handleTemp}>+</button>
          {error.temperament && <p>{error.temperament}</p>}     
        <div>
          {input.temperament.length > 0
            ? input.temperament.map((e) => (
                <p key={e}>
                  <label> {e} </label>
                  <button onClick={eraseTemp} value={e}>
                    x
                  </button>
                </p>
              ))
            : <p></p>}
        </div>
      </div>

      <div>
        <label>Peso promedio: </label>
        <input
          type="number"
          name="weight"
          placeholder="Peso en kg..."
          value={input.weight}
          onChange={handleInput}
        />
        {error.weight && <p>{error.weight}</p>}
      </div>

      <div>
        <label>Altura promedio: </label>
        <input
          type="number"
          name="height"
          placeholder="Altura en cm..."
          value={input.height}
          onChange={handleInput}
        />
        {error.height && <p>{error.height}</p>}
      </div>

      <div>
        <label>Años de vida promedio: </label>
        <input
          type="number"
          name="life_span"
          placeholder="Años..."
          value={input.life_span}
          onChange={handleInput}
        />
        {error.life_span && <p>{error.life_span}</p>}
      </div>

      <div>
        <label>Descripción: </label>
        <textarea
          value={input.description}
          name="description"
          onChange={handleInput}
        />
      </div>
      <input type="submit" value="Crear" disabled={!submit} />
    </form>
  );
}

export default Create;
