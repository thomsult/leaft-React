import { createContext } from "react";



export const MapContextDefault = {
    typeDeContract: "ALL",
    alternance: "ALL",
    experienceExige: "ALL",
    searchValue: null,
  }


export const MapContext = createContext(MapContextDefault);
