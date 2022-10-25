// @ts-nocheck
import React,{useState,useRef,useContext} from "react";
import "./bouton.css";
import { useMapEvents } from "react-leaflet";

import { MapContext} from "../../utils/mapContext";




export const BoutonMap = () => {


  const filter = useContext(MapContext)

const [FilterState, SetFilterState] = useState({
  typeDeContract: "ALL",
  alternance: "ALL",
  experienceExige: "ALL",
  searchValue: null,
})

const [count,setcount] = useState([43.604652,1.444209])

const [XP,SetXP] = useState([false,false])
const [Contract,SetContract] = useState("ALL")
const map = useMapEvents({})


const UpdateState = (e) =>{
  SetFilterState(e)
  filter.SetSearchValue(e)
}




const handleOnChange = (position) => {
const xp = XP.map((el,index)=>index == position?!el:el)
SetXP(xp)
const xpToString = xp.every(el=>el == true)
const xpToStringFalse = xp.every(el=>el == false)

if(xpToString || xpToStringFalse){
  UpdateState({...FilterState,experienceExige:"ALL"})
}else{
  if(xp[0] == true && xp[1] == false){
    UpdateState({...FilterState,experienceExige:"E"})
  }
  if(xp[1] == true && xp[0] == false){
    UpdateState({...FilterState,experienceExige:"D"})
  }
}

}


const handleContratChange = (e)=>{
  if(e.target.value !== "Alternance"){
    UpdateState({...FilterState,alternance:"false",typeDeContract:e.target.value})
    
  }else{
    UpdateState({...FilterState,alternance:"true",typeDeContract:"ALL"})
  }
  SetContract(e.target.value)
}


const handleSearchChange = (e)=>{

  try {
    
    if(e.target.value.trim() !== ''){
      UpdateState({...FilterState,searchValue:e.target.value})
    }else{
      UpdateState({...FilterState,searchValue:null})
    }
   
  } catch (error) {
    
  }
}








  return (
    <div className="BoutonBar__Container">
      <div>
      <label htmlFor="XPE">Expérimenté
      <input type="checkbox" name="XPE" id="XP" 
      checked={XP[0]}
      onChange={() => handleOnChange(0)}/>


      </label>
      <p>{XP}</p>
      <label htmlFor="XPD">Debutant
      <input type="checkbox" name="XPD" id="XP"       
      checked={XP[1]}
      onChange={() => handleOnChange(1)}/>
      </label>
      </div>

      <label htmlFor="Contract">
        <select name="Contract" id="Contract" onChange={handleContratChange} value={Contract}>
        <option defaultValue={0} value="ALL">Tous</option>
        <option value="CDD">CDD</option>
        <option value="CDI">CDI</option>
        <option value="Alternance">Alternance</option>
        </select>


      </label>

      <div className="BoutonBar__Search">
        <input id='Search' onChange={handleSearchChange} name="Search" type="text" placeholder="Search" />
      </div>
    </div>
  );}
