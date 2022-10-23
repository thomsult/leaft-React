import React,{useState,useRef,useContext} from "react";
import "./bouton.css";
import { useMapEvents } from "react-leaflet";
import { MapContext } from "../map";




export const BoutonMap = () => {
  const filter = useContext(MapContext) 

const inputRef = useRef(null)

const [count,setcount] = useState([43.604652,1.444209])

const map = useMapEvents({})





const prevBt = (e)=>{

    map.flyTo([43.61093999177163,
        1.5737186382597894])
}
const nextBt = (e)=>{
    map.flyTo([43.604652,1.444209])
}
const handleClick = (e)=>{
  try {
    if(inputRef.current.value.trim() !== ''){
      filter.SetSearchValue(inputRef.current.value)
    }else{
      filter.SetSearchValue(null)
    }
   
  } catch (error) {
    
  }

}

  return (
    <div className="BoutonBar__Container">
      <button onClick={prevBt}>Prev</button>
      <button onClick={nextBt}>Next</button>
      <div className="BoutonBar__Search">
        
        <input ref={inputRef} id='Search' name="Search" type="text" placeholder="Search" />
        <label htmlFor="Search">
          <button onClick={handleClick}>OK</button>
        </label>
      </div>

      <div></div>
    </div>
  );
};
