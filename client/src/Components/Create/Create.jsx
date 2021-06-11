import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTemperament, addBreed, getBreeds } from "../../Actions/index";

function Create() {
  const dispatch = useDispatch();
  let stateTemp = useSelector((state) => state.temperament);
  let stateBreeds = useSelector((state) => state.breeds);
  let [temp, setTemp] = useState("Active");

  const [input, setInput] = useState({
    name: "",
    temperament: [],
    weight: "",
    height: "",
    life_span: "",
    description: "",
  });

  useEffect(() => {
    dispatch(getTemperament());
    dispatch(getBreeds());
  }, [dispatch]);

  const handleInput = (event) => {
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
        setInput({
          ...input,
          temperament: [...input.temperament, temp],
        });
        setTemp("Active");
        
      }
    }
  };

  const eraseTemp = (event) => {
    event.preventDefault();
    console.log(event);
    let temp = input.temperament.filter((e) => e !== event.target.value);
    console.log(temp);
    setInput({
      ...input,
      temperament: temp,
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
      })
    }
    let newBreed = stateBreeds[0];
    return <h1>{newBreed.name}</h1>;
  };

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
      </div>

      <div>
        <label>Temperamento: </label>
        {Array.isArray(stateTemp) ? (
          <select
            name="temperament"
            onChange={handleInput}
            value={temp}
          >
            {stateTemp.map((e) => (
              <option
                name="temperament"
                key={e.name}
                onChange={handleInput}
              >
                {e.name}
              </option>
            ))}
          </select>
        ) : (
          <h1>Cargando...</h1>
        )}
        <button onClick={handleTemp}>+</button>
        <div>
          {input.temperament.length > 0
            ? input.temperament.map((e) => (
                <label key={e}>
                  <label> {e} </label>
                  <button onClick={eraseTemp} value={e}>
                    x
                  </button>
                </label>
              ))
            : null}
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
      </div>

      <div>
        <label>Descripción: </label>
        <textarea
          value={input.description}
          name="description"
          onChange={handleInput}
        />
        {/* <input 
        type='number'
        name='life_span'
        placeholder='Años...'
        value={input.life_span}
        onChange={handleInput}
        /> */}
      </div>

      <input type="submit" value="Crear" />
    </form>
  );
}

export default Create;
