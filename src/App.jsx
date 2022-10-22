import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import React, { useState, useEffect } from "react";
import { MarkerJobList } from "./component/markerJobByCommunes";
import "./App.css";
import data from "./assets/import.json";
import commune from "./assets/communes.json";
import quartiers from "./assets/quartierslocale.json";

import {
  typeDeContract,
  alternance,
  experienceExige,
  filterByAlternance,
  filterByExperienceExige,
  filterByTypeContrat,
  Search,
} from "./component/filter/filter";

const mapConfig = {
  lat: 43.604652,
  lng: 1.444209,
};
// @ts-ignore

const cities = data.resultats
  .map((e) => e.lieuTravail.libelle)
  .filter((item, pos, arr) => arr.indexOf(item) == pos)
  .map((el) => {
    return { city: el, Data: [] };
  });

const marker = data.resultats
  .filter((item) => filterByTypeContrat(item, typeDeContract[0]))
  .filter((item) => filterByAlternance(item, alternance[0]))
  .filter((item) => filterByExperienceExige(item, experienceExige[0]))
  .filter((item) => Search(item, ""))

  .map((resultat, index, arr) => {
    cities.map((city) => {
      if (city.city == resultat.lieuTravail.libelle) {
        // @ts-ignore
        city.Data.push(resultat);
      }
    });

    return cities;
  });

console.log(cities);

function MyMap() {
  const onEachZone = (zone, layer) => {
    const name = zone.properties.libelle || zone.properties.nom_quartier;
    layer.bindTooltip(name, {
      sticky: true,
    });
  };

  return (
    <MapContainer
      // @ts-ignore
      center={mapConfig}
      zoom={13}
    >
      <TileLayer
        // @ts-ignore
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {marker[0][0].Data &&
        marker[0].map((el, index) => {
          // @ts-ignore
          return <MarkerJobList key={index} data={el.Data} city={el.city} />;
        })}

      <GeoJSON
        // @ts-ignore
        style={{
          color: "rgba(0,0,0,0.2)",
          opacity: 0,
          fillOpacity: 0.1,
        }}
        key="commune"
        data={commune}
        onEachFeature={onEachZone}
      />

      <GeoJSON
        // @ts-ignore
        style={{
          color: "rgba(0,0,0,0.2)",
          opacity: 0,
          fillOpacity: 0.1,
        }}
        key="quartiers"
        data={quartiers}
        onEachFeature={onEachZone}
      />
    </MapContainer>
  );
}

function App() {
  return (
    <div className="App">
      {}
      <MyMap />
    </div>
  );
}
//<Locations data={MyData} />
export default App;
