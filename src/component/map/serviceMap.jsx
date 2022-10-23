
import "leaflet/dist/leaflet.css";

import React,{useContext,useEffect, useState} from "react";

import { MarkerJobList } from "./marker/markerJobByCommunes";


import data from "../../assets/import.json";

import {
  filterByAlternance,
  filterByExperienceExige,
  filterByTypeContrat,
  Search,
} from "./filter/filter";
import { MapContext } from "./map";





export default function ServiceMap() {

const context  = useContext(MapContext)
const [state,setstate] = useState({
  typeDeContract: null,
  alternance: null,
  experienceExige: null,
  searchValue: null,
})
context.SetSearchValue = (e)=>{
  setstate({
    typeDeContract: null,
    alternance: null,
    experienceExige: null,
    searchValue: e,
  })
}







  const cities = data.resultats
  .map((e) => e.lieuTravail.libelle)
  .filter((item, pos, arr) => arr.indexOf(item) == pos)
  .map((el) => {
    return { city: el, Data: [] };
  });


  const marker = data.resultats
  .filter((item) => filterByTypeContrat(item, state.typeDeContract))
  .filter((item) => filterByAlternance(item, state.alternance))
  .filter((item) => filterByExperienceExige(item, state.experienceExige))
  .filter((item) => Search(item, state.searchValue))
  .map((resultat, index, arr) => {
    cities.map((city) => {
      if (city.city == resultat.lieuTravail.libelle) {
        // @ts-ignore
        city.Data.push(resultat);
      }
    });
    return cities;
  });
/*    */


console.log(cities,state.searchValue)
  return cities.length>0 && 
  // @ts-ignore
  cities.map((el, index) => <MarkerJobList key={index} data={el.Data} city={el.city} />)
}
