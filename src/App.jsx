
import {MapContainer,TileLayer,GeoJSON} from 'react-leaflet'

import "leaflet/dist/leaflet.css";

// @ts-ignore
import React,{ useState,useEffect } from 'react'
import {MarkerJob} from "./component/markerJob"
import './App.css'
import data from "./assets/import.json";
import commune from "./assets/communes.json"
import quartiers from "./assets/quartierslocale.json"


const mapConfig = {
  lat: 43.604652,
  lng: 1.444209
};
// @ts-ignore
const cities = data.resultats.map((e)=>e.lieuTravail.libelle).filter((item, pos,arr)=> arr.indexOf(item) == pos).map((el)=>{return {"city":el,Data:[]}})

console.log(cities)


const marker = data.resultats.map((resultat) => {
  cities.map((city)=>{
    if(city.city == resultat.lieuTravail.libelle){
      city.Data.push(resultat)
    }
  })

  return cities
});



function MyMap() {
  return (
    <MapContainer 
// @ts-ignore
    center={mapConfig} zoom={13}>
      <TileLayer
        // @ts-ignore
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
       {marker[0][0].Data&&marker[0].map((el, index) => {
          return <MarkerJob key={index} data={el.Data} city={el.city}/>;
        })} 
        
        <GeoJSON
          // @ts-ignore
          style={{ 
            color: "rgba(0,0,0,0.2)", 
            opacity: 0, 
            fillOpacity: 0.1,}}
          key="commune"
          data={commune}
          /* onEachFeature={onEachContry} */
        />
        <GeoJSON
          // @ts-ignore
          style={{ 
            color: "rgba(0,0,0,0.2)", 
            opacity: 0, 
            fillOpacity: 0.1,}}
          key="quartiers"
          data={quartiers}
          /* onEachFeature={onEachContry} */
        />
    </MapContainer>
  )
}


function App() {

  return (
    <div className="App">
      {}
    <MyMap/>
    </div>
  )
}
//<Locations data={MyData} /> 
export default App
