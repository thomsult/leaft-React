// @ts-nocheck
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import React,{createContext, useContext, useState} from "react";

import commune from "../../assets/communes.json";
import quartiers from "../../assets/quartierslocale.json";

import ServiceMap from "./service/serviceMap";

import { BoutonMap } from "../searchBar/bouton/bouton";

const access_token = import.meta.env.VITE_ACCESS_TOKEN;
const produc = import.meta.env.VITE_PRODUCTION | "false";

const mapConfig = {
  lat: 43.604652,
  lng: 1.444209,
};




export const MyMap = (props) => {



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
        zoom={18}
      >
        <BoutonMap></BoutonMap>
        <ServiceMap/>
        {produc == "True" ? (
          <TileLayer
            // @ts-ignore
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/512/{z}/{x}/{y}@2x?access_token=${access_token}`}
            // @ts-ignore
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          />
        ) : (
          <TileLayer
            // OpenStreetMap
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            // @ts-ignore
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        )}
        

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
