// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Marker, Popup,Tooltip } from "react-leaflet";
import JobLoc from "../../../assets/Siret.json";
import {filterByEntreprise} from "../filter/filterByEntreprise"




import L from "leaflet";

const iconPoleEmploi = L.icon({
  iconUrl: "/pole-emploi-logo-vector.svg",
  iconSize: [25, 25],
  iconAnchor: [6, 6],
  popupAnchor: [0, 0],
});



const MarkerJob = ({name,city ,Offre,Loc =[0,0]}) => {
let src = ""
let icon = {}
const partenaire = "/pole-emploi-logo-vector.svg"
if(name == "Noncomuniquer"){
  Loc =[43.605043,1.433195]
  name="Pas de Nom d'entreprise"
  src = "/pole-emploi-logo-vector.svg"
  icon = {icon : iconPoleEmploi}
}
try {
  src = Offre[0].entreprise.logo
} catch (error) {
  src = "/pole-emploi-logo-vector.svg"
}
if(name == "Pas de Localisation"){
  src = "/pole-emploi-logo-vector.svg"
  icon = {icon : iconPoleEmploi}
}
  //ul a refaire peut être plus dynamic
  //tous comme les image je recupere que sur l'index 0
 console.log(Offre)
    return (Offre[0]&&
      <Marker position={Loc}  {...icon}>
        <Tooltip>{name}</Tooltip>
    <Popup>
      <h3>
        {name}
      </h3>
      <p>
        <i>{city}</i>
      </p>
      {src&&<img
        src={src}
        alt={`Logo ${name}`}
        style={{ height: "50px", width: "auto" }}
      />}

      <ul>
        {Offre.map((el, index) => (index<6&&
          <li key={index}>{el.intitule}<br />
          {name == "Pas de Localisation"&&<small>{el.entreprise.nom}</small>}
          
          
          </li>
        ))}

        {Offre.length > 6&&<p>il reste {Offre.length-6} annonces</p>}
      </ul>

      {Offre[0]&&Offre[0].origineOffre.partenaires&&Offre[0].origineOffre.partenaires.map((el, index) => (
          <img
          key={index}
        src={el.logo}
        alt={el.nom}
        style={{ height: "50px", width: "auto" }}
      />
        ))}
      
    </Popup>
  </Marker>
     );

 
  
};

//[]




const MarkerToulouse = (props) => {
//console.log(filterByEntreprise(props,JobLoc))
    return filterByEntreprise(props,JobLoc)
    .map(([name, el], index) => {
      if(name == "NoLocation"){
      const newP = []
      el.forEach(([name,{Offre}])=>{
        newP.push(Offre)
      })

        return (<MarkerJob key={index} name={"Pas de Localisation"} city={props.city} Offre={newP.flat()} Loc={[43.599043,1.433195]}/>)
      }else{
        return (<MarkerJob key={index} name={name} city={props.city} Offre={el.Offre} Loc={el.Loc}/>)
      }
      
    }
      
    );
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
        <Tooltip><p>
            <strong>{props.data.length}</strong> Offres à <strong>{city}</strong>
          </p></Tooltip>
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
