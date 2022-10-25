
import React from "react";
import {MyMap} from "./component/map/map";



import "./App.css";
import { MapContext,MapContextDefault } from "./component/utils/mapContext";
function App() {
  return (
    <div className="App">
          <MapContext.Provider value={MapContextDefault}>
          <MyMap />
          </MapContext.Provider>
    
    </div>
  );
}
export default App;
