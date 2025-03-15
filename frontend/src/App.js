import "./App.css";
import { useState, useEffect } from "react";
import Map from "./Map";

function App() {
  const [providerClick, setProviderClick] = useState(false);
  const [typeClick, setTypeClick] = useState(false);
  const [showUnlimited, setShowUnlimited] = useState(false);
  const [showLimited, setShowLimited] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/hotspots")
      .then((res) => res.json())
      .then((data) => {
        console.log("im working");
        setData(data);
        console.log(data);
      });
  }, []);

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
      <img src="./logo.jpg"></img>
      <input
        className="pure-input-rounded"
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
            <label htmlFor="provider">Provider</label>
            {providerClick && (
              <div id="providerfilters">
                <input
                  type="checkbox"
                  id="provider1"
                  name="provider1"
                  onClick={dummyFunction}
                ></input>
                <label htmlFor="provider1">Provider1</label>
                <br></br>
                <input
                  type="checkbox"
                  id="provider2"
                  name="provider2"
                  onClick={dummyFunction}
                ></input>
                <label htmlFor="provider2">Provider2</label>
              </div>
            )}
          </div>
          <div>
            <input
              type="checkbox"
              id="type"
              name="type"
              onClick={moreType}
            ></input>
            <label htmlFor="type">Type</label>
            {typeClick && (
              <div id="typefilters">
                <input
                  type="checkbox"
                  id="type1"
                  name="type1"
                  onClick={dummyFunction}
                ></input>
                <label htmlFor="type1">Unlimited</label>
                <br></br>
                <input
                  type="checkbox"
                  id="type2"
                  name="type2"
                  onClick={dummyFunction}
                ></input>
                <label htmlFor="type2">Limited</label>
              </div>
            )}
          </div>
        </div>
        <Map markerData={data} />
      </div>
    </div>
  );
}

export default App;
