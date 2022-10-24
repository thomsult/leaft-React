// @ts-nocheck
import React,{useState,useRef,useContext} from "react";
import "./bouton.css";
import { useMapEvents } from "react-leaflet";

import { MapContext} from "../../utils/mapContext";




export const BoutonMap = () => {
  const filter = useContext(MapContext)



const [count,setcount] = useState([43.604652,1.444209])

const [XP,SetXP] = useState([false,false])
const [Contract,SetContract] = useState("ALL")
const map = useMapEvents({})



/* 
const handleSearchChange = (e)=>{
  try {
    if(e.target.value.trim() !== ''){
      filter.SetSearchValue(e.target.value)
    }else{
      filter.SetSearchValue(null)
    }
   
  } catch (error) {
    
  }

} */
const handleOnChange = (position) => {
const xp = XP.map((el,index)=>index == position?!el:el)
SetXP(xp)
const xpToString = xp.every(el=>el == true)
const xpToStringFalse = xp.every(el=>el == false)

/* if(xpToString || xpToStringFalse){
  filter.SetExperienceExige("ALL")
}else{
  if(xp[0] == true && xp[1] == false){
    filter.SetExperienceExige("E")
  }
  if(xp[1] == true && xp[0] == false){
    filter.SetExperienceExige("D")
  }
}
 */


}


const handleContratChange = (e)=>{
  SetContract(e.target.value)
 /*  if(e.target.value !== "Alternance"){
    filter.SetContract(e.target.value)
    filter.SetAlternance("false")
    console.log(e.target.value)
  }else{
    filter.SetContract("ALL")
    filter.SetAlternance("true")
  }
   */
}




const handleSearchChange = (e)=>{

  try {
    if(e.target.value.trim() !== ''){
      filter.searchValue = e.target.value
      filter.SetSearchValue(e.target.value)
    }else{
      filter.SetSearchValue(null)
    }
   
  } catch (error) {
    
  }}





  return (
    <div className="BoutonBar__Container">
      <div>
      <label htmlFor="XPE">Experimenter
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
