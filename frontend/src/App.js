import "./App.css";
import { useState, useEffect } from "react";
import Map from "./Map";



function App() {
  const [providerClick, setProviderClick] = useState(false);
  const [typeClick, setTypeClick] = useState(false);
  const [showUnlimited, setShowUnlimited] = useState(false);
  const [showLimited, setShowLimited] = useState(false);

  const dummyFunction = async () => {
    //PLACEHOLDER
  };

  const moreProvider = async () => {
    if (providerClick) {
      setProviderClick(false);
    } else {
      setProviderClick(true);
    }
  };

  const moreType = async () => {
    if (typeClick) {
      setTypeClick(false);
    } else {
      setTypeClick(true);
    }
  };

  return (
    <div id="main">
      <input
        class="pure-input-rounded"
        placeholder="Enter your location"
        type="text"
        id="input"
      ></input>
      <div id="map">
        <div id="filter">
          <div>
            {" "}
            Filters
            <br></br>
            <input
              type="checkbox"
              id="provider"
              name="provider"
              onClick={moreProvider}
            ></input>
            <label for="provider">Provider</label>
            {providerClick && <div>List providers here</div>}
          </div>
          <div>
            <input
              type="checkbox"
              id="type"
              name="type"
              onClick={moreType}
            ></input>
            <label for="type">Type</label>
            {typeClick && (
              <div id="typefilters">
                <input
                  type="checkbox"
                  id="type1"
                  name="type1"
                  onClick={dummyFunction}
                ></input>
                <label for="type1">Unlimited</label>
                <br></br>
                <input
                  type="checkbox"
                  id="type2"
                  name="type2"
                  onClick={dummyFunction}
                ></input>
                <label for="type2">Limited</label>
              </div>
            )}
          </div>
        </div>
        <Map />
      </div>
    </div>
  );
}

export default App;
