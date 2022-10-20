import React, { useEffect, useState } from "react";
import axios from "axios";
import { Marker, Popup } from "react-leaflet";

export const MarkerJob = (props) => {
  const [loc, SetLoc] = useState([props.data[0].lieuTravail.latitude,props.data[0].lieuTravail.longitude]);
  const [loaded, SetLoaded] = useState(false);

  return (
    loc[0]!==0 ? (
      <Marker position={loc} key={props.id}>
        <Popup>
          <p>Il y a {props.data.length} Offres dans la commune de {props.city.substring(5,props.city.length)}</p>
          <ul>
            {props.data.map((el,index)=>{return <li key={index}>
              {el.intitule}<br/>
              
            <small>{el.entreprise.nom}</small>
            </li>

            })}
          </ul>
        </Popup>
      </Marker>
    ):(<></>)
  );
};

   /* useEffect(() => {

<h3>{props.intitule}</h3>
          <p>{props.name}</p>

          <a href={props.origineOffre.urlOrigine}>pole Emploi</a>



    let IsSubscribed = true;
    if (!loaded && loc[0] === 55) {
      axios
        .get(
          `https://data.toulouse-metropole.fr/api/records/1.0/search/?dataset=base-sirene-v3&q=${props.name}`
        )
        .then((res) => {
          if (res.status === 200) {
            // Check If This Component Still Mounted
            if (IsSubscribed) {
              res.data.records[0] &&
                SetLoc([
                  res.data.records[0].geometry.coordinates[1],
                  res.data.records[0].geometry.coordinates[0]
                ]);
              SetLoaded(true);
            }
          }
        });
    }
  }, [props.name, loc, loaded]); */