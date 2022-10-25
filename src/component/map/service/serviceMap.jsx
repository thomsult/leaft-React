
import "leaflet/dist/leaflet.css";

import React,{useContext,useEffect, useState} from "react";

import { MarkerJobList } from "../marker/markerJobByCommunes";


import data from "../../../assets/import.json";

import {
  filterByAlternance,
  filterByExperienceExige,
  filterByTypeContrat,
  Search
} from "../filter/filter";
import { MapContext } from "../../utils/mapContext";





export default function ServiceMap() {
const context = useContext(MapContext)
const [Filter,setFilter] = useState(context)


context.SetSearchValue = (e)=>{setFilter(e) ;console.log(e)}


const FilterMap = (array)=>{
return array.filter((item) => filterByTypeContrat(item, Filter.typeDeContract))
.filter((item) => filterByAlternance(item, Filter.alternance))
.filter((item) => filterByExperienceExige(item, Filter.experienceExige))
.filter((item) => Search(item, Filter.searchValue))

}
const DataByLieuTravail = (city,array)=>{
  return array.filter((resultat)=>city == resultat.lieuTravail.libelle)
}




  const cities = data.resultats
  .map((e) => e.lieuTravail.libelle)
  .filter((item, pos, arr) => arr.indexOf(item) == pos)
  .map((el) => {
    return { city: el, Data:[] };
  })
  .map(({city})=>{  
    return { city, Data:FilterMap(DataByLieuTravail(city,data.resultats)) }
  })


//console.log(cities,Filter.searchValue)
  return cities.length>0 && 
  // @ts-ignore
  cities.map((el, index) => <MarkerJobList key={index} data={el.Data} city={el.city} />)
}
