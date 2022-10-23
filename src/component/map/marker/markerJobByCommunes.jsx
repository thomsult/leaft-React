// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Marker, Popup } from "react-leaflet";

import JobLoc from "../../../assets/Siret.json";

///ATTENTION LE MAL DE CRANE VA ARRIVER!!!

import L from "leaflet";

const iconWork = L.icon({
  iconUrl: "/vite.svg",
  iconSize: [25, 25],
  iconAnchor: [6, 6],
  popupAnchor: [0, 0],
});

const iconCity = L.icon({
  iconUrl: "/vite.svg",
  iconSize: [55, 55],
  iconAnchor: [25, 30],
  popupAnchor: [0, 0],
});

const iconStandard = (State) => {
  const iconCity = L.icon({
    iconUrl: "/pole-emploi-logo-vector.svg",
    iconSize: !State ? [25, 25] : [0, 0],
    iconAnchor: [6, 6],
    popupAnchor: [0, 0],
  });
  return iconCity;
};

const Job = (props) => {
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
      <Marker position={p} icon={iconWork}>
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
  const JobByEntreprise = { Noncomuniquer: { Offre: [] } };
  props.data.forEach((el) => {
    if (el.entreprise.nom !== undefined) {
      if (JobByEntreprise[el.entreprise.nom] === undefined) {
        let loc = [];
        JobLoc.forEach((entreprise) => {
          if (entreprise.parameters.q == el.entreprise.nom) {
            loc = entreprise.records.filter(
              (param) => param.fields.etatadministratifetablissement !== "Fermé"
            );
          }
        });

        let LocRecents =
          loc.length > 1
            ? loc.reduce((a, b) => {
                if (a.fields !== undefined) {
                  return new Date(a.fields.datedebutetablissement) >
                    new Date(b.fields.datedebutetablissement)
                    ? a
                    : b;
                }
              })
            : {
                geometry: {
                  coordinates: loc[0] || [
                    el.lieuTravail.latitude,
                    el.lieuTravail.longitude,
                  ],
                },
              };

        Object.defineProperty(JobByEntreprise, el.entreprise.nom, {
          value: { Offre: [el], Loc: LocRecents.geometry.coordinates },
          writable: true,
          enumerable: true,
          configurable: true,
        });
      } else {
        JobByEntreprise[el.entreprise.nom].Offre.push(el);
      }
    } else {
      JobByEntreprise.Noncomuniquer.Offre.push(el);
    }
  });

  const list = [];

  /*  if(value.length > 0){
  list.push(value)
  
}
 */

  for (const [key, value] of Object.entries(JobByEntreprise)) {
    let loc = [0, 0];
    try {
      loc = value.Loc.geometry.coordinates;
    } catch (error) {
      loc = value.Loc;
    }
    list.push([key, value]);
  }

  //console.log(props.city, list);
  return list.map(([name, el], index) => (
    <Job key={index} name={name} city={props.city} {...el}></Job>
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
      <Marker position={loc} icon={iconStandard()}>
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
