import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import {  MediaItemWithOwner } from "hybrid-types/DBTypes";

const Single = () => {
    const navigate: NavigateFunction = useNavigate();
    const {state} = useLocation();
    const item: MediaItemWithOwner = state.item;
  return (
    <>
    <h2>Single</h2>
        <h2>{item.title}</h2>
      <p>{item.description}</p>
      <p>{new Date(item.created_at).toLocaleString('fi-FI')}</p>
      {item.media_type.includes('image') && (
        <img src={item.filename} alt={item.title} />
      )}
      {item.media_type.includes('video') && (
        <video src={item.filename} controls>

          <source/>
          Your browser does not support the video tag.
        </video>
      )}
      <button className="goback" onClick={() => {navigate(-1)}}>

        Go back
      </button>
     
    
    </>
  )
}

export default Single;



