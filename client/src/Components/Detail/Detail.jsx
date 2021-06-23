import { useEffect } from "react";
import { getBreedDetail, clearDetail } from "../../Actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./Detail.css";

function Detail() {
  const dispatch = useDispatch();
  const breedDetail = useSelector((state) => state.breedDetail);
  const { id } = useParams();

  useEffect(() => {
    dispatch(clearDetail());
    dispatch(getBreedDetail(id));
    return () => dispatch(clearDetail());
  }, [dispatch, id]);

  console.log(breedDetail)

  if (breedDetail === null) {
    return <h1 className="loading">Breed don't exist</h1>;
  } else if (breedDetail === undefined) {
    return <h1 className="loading">Loading...</h1>;
  } else {
    return (
      <div className="container">
        <div className="detailContainer">
          <div className="nameContainer">
            <h2> {breedDetail.name} </h2>
          </div>
          <img src={breedDetail.image} alt="Foto raza" className="dogPic" />
          <div className="dataContainer">
            <h6>Temperament</h6>
            <h3 className="arrayTemp">{breedDetail.temperament}</h3>
            <div className='heightWeight'>
              <div>
            <h6>Average height</h6>
            <h3>{breedDetail.height} cm</h3>
            </div>
            <div>
            <h6>Average weight</h6>
            <h3>{breedDetail.weight} kg</h3>
            </div>
            <div>
            <h6>Life span</h6>
            <h3>{breedDetail.life_span}</h3>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
