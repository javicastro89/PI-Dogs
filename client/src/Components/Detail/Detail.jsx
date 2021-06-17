import { useEffect } from "react";
import { getBreedDetail, clearDetail } from "../../Actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Detail() {
  const dispatch = useDispatch();
  const breedDetail = useSelector((state) => state.breedDetail);
  const {id} = useParams()
    
  useEffect(() => {
    dispatch(clearDetail())
    dispatch(getBreedDetail(id));
    return () => dispatch(clearDetail())
  }, [dispatch, id]);


  if (breedDetail === null) {
    return <h1>Breed don't exist</h1>
  }
  else if (breedDetail === undefined) {
    return <h1>Loading...</h1>
  }
  else {
      return (
        <div>
          <h4> {breedDetail.name} </h4>
          <img src={breedDetail.image} alt="Foto raza" className="dogPic" />
          <h6>{breedDetail.temperament}</h6>
          <h6>{breedDetail.height}</h6>
          <h6>{breedDetail.weight}</h6>
          <h6>{breedDetail.life_span}</h6>
        </div>
      );
  }

  
}

export default Detail;
