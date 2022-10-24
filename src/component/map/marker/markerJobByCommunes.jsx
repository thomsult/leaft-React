// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Marker, Popup } from "react-leaflet";
import JobLoc from "../../../assets/Siret.json";
import {filterByEntreprise} from "../filter/filterByEntreprise"


///ATTENTION LE MAL DE CRANE VA ARRIVER!!!

import L from "leaflet";

const iconPoleEmploi = L.icon({
  iconUrl: "/pole-emploi-logo-vector.svg",
  iconSize: [25, 25],
  iconAnchor: [6, 6],
  popupAnchor: [0, 0],
});




const MarkerJob = (props) => {
  let p = [43.607182, 1.452805];
  if (props.Loc !== undefined) {
    if (props.Loc.geometry?.coordinates !== undefined) {
      if (props.Loc.geometry.coordinates[1] > 42) {
        p = [
          props.Loc.geometry.coordinates[1],
          props.Loc.geometry.coordinates[0],
        ];
      } else {
        p = [
          props.Loc.geometry.coordinates[0],
          props.Loc.geometry.coordinates[1],
        ];
      }
    } else {
      if (props.Loc.length == 2 && props.Loc[1] > 42) {
        p = [props.Loc[1], props.Loc[0]];
      } else if (props.Loc.length == 2 && props.Loc[1] < 42) {
        p = [props.Loc[0], props.Loc[1]];
      } else {
        p = [43.604082, 1.433805];
      }
    }
  }

  //console.log(props, p);
  return (
    props.Offre[0] && (
      <Marker position={p} >
        <Popup>
          <h3>
            {props.name == "Noncomuniquer" ? "Non Renseigné" : props.name}
          </h3>
          <p>
            <i>{props.city}</i>
          </p>
          <img
            src={
              props.Offre[0].entreprise.logo
                ? props.Offre[0].entreprise.logo
                : "/pole-emploi-logo-vector.svg"
            }
            alt="logo"
            style={{ height: "50px", width: "auto" }}
          />

          <ul>
            {props.Offre.map((el, index) => (
              <li key={index}>{el.intitule}</li>
            ))}
          </ul>
        </Popup>
      </Marker>
    )
  );
};

//[]




const MarkerToulouse = (props) => {

    return filterByEntreprise(props,JobLoc).map(([name, el], index) => (
      <MarkerJob key={index} name={name} city={props.city} {...el}/>
    ));
  };

export const MarkerJobList = (props) => {
  if (props.data[0] !== undefined) {
    const [loc, SetLoc] = useState([
      props.data[0].lieuTravail.latitude,
      props.data[0].lieuTravail.longitude,
    ]);

    const city = props.city.substring(5, props.city.length);

    return props.city.includes("TOULOUSE") ? (
      <MarkerToulouse {...props} />
    ) : (
      <Marker position={loc} icon={iconPoleEmploi}>
        <Popup>
          <img
            src="/pole-emploi-logo-vector.svg"
            alt="logo"
            style={{ height: "50px", width: "auto" }}
          />
          <p>
            Il y a <strong>{props.data.length}</strong> Offres dans la commune
            de <strong>{city}</strong>
          </p>
          <ul>
            {props.data.map((el, index) => {
              return (
                <li key={index}>
                  {el.intitule}
                  <br />

                  <small>{el.entreprise.nom}</small>
                </li>
              );
            })}
          </ul>
        </Popup>
      </Marker>
    );
  }
};
