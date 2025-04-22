import "./App.css";
import { useState, useEffect } from "react";
import Map from "./Map";

function App() {
  const [providerClick, setProviderClick] = useState(false);
  const [typeClick, setTypeClick] = useState(false);
  const [showUnlimited, setShowUnlimited] = useState(false);
  const [showLimited, setShowLimited] = useState(false);
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("/api/hotspots")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  const dummyFunction = async () => {
    //PLACEHOLDER
  };

  const submitZip = async () => {
    const inputData = input;
    fetch(`/api/hotspots/zip/${inputData}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
    setInput("");
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
        placeholder="Enter your zip code"
        type="text"
        id="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        maxLength={5}
      ></input>
      <button onClick={submitZip}>Submit</button>
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
            <label htmlFor="provider" id="arrow">
              Provider
            </label>
            {providerClick && (
            <div id="providerfilters">
              <div>
                <input
                type="checkbox"
                id="ALTICEUSA"
                name="ALTICEUSA"
                onClick={dummyFunction} />
                <label htmlFor="ALTICEUSA">ALTICEUSA</label>
              </div>
              <div>
                <input
                type="checkbox"
                id="AT&T"
                name="AT&T"
                onClick={dummyFunction} />
                <label htmlFor="AT&T">AT&T</label>
              </div>
              <div>
                <input
                type="checkbox"
                id="BPL"
                name="BPL"
                onClick={dummyFunction} />
                <label htmlFor="BPL">BPL</label>
              </div>
              <div>
                <input
                type="checkbox"
                id="Chelsea"
                name="Chelsea"
                onClick={dummyFunction} />
                <label htmlFor="Chelsea">Chelsea</label>
              </div>
              <div>
                <input
                type="checkbox"
                id="City Tech"
                name="City Tech"
                onClick={dummyFunction} />
                <label htmlFor="City Tech">City Tech</label>
              </div>
              <div>
                <input
                type="checkbox"
                id="Downtown Brooklyn"
                name="Downtown Brooklyn"
                onClick={dummyFunction} />
                <label htmlFor="Downtown Brooklyn">Downtown Brooklyn</label>
              </div>
              <div>
                <input
                type="checkbox"
                id="Fiberless"
                name="Fiberless"
                onClick={dummyFunction} />
                <label htmlFor="Fiberless">Fiberless</label>
              </div>
              <div>
                <input
                type="checkbox"
                id="Harlem"
                name="Harlem"
                onClick={dummyFunction} />
                <label htmlFor="Harlem">Harlem</label>
              </div>
              <div>
                <input
                type="checkbox"
                id="LinkNYC - Citybridge"
                name="LinkNYC - Citybridge"
                onClick={dummyFunction} />
                <label htmlFor="LinkNYC - Citybridge">LinkNYC - Citybridge</label>
              </div>
              <div>
                <input
                type="checkbox"
                id="Manhattan Down Alliance"
                name="Manhattan Down Alliance"
                onClick={dummyFunction} />
                <label htmlFor="Manhattan Down Alliance">Manhattan Down Alliance</label>
              </div>
              <div>
                <input
                type="checkbox"
                id="NYCHA"
                name="NYCHA"
                onClick={dummyFunction} />
                <label htmlFor="NYCHA">NYCHA</label>
              </div>
              <div>
                <input
                type="checkbox"
                id="NYPL"
                name="NYPL"
                onClick={dummyFunction} />
                <label htmlFor="NYPL">NYPL</label>
              </div>
              <div>
                <input
                type="checkbox"
                id="Partner"
                name="Partner"
                onClick={dummyFunction} />
                <label htmlFor="Partner">Partner</label>
              </div>
              <div>
                <input
                type="checkbox"
                id="QPL"
                name="QPL"
                onClick={dummyFunction} />
                <label htmlFor="QPL">QPL</label>
              </div>
              <div>
                <input
                type="checkbox"
                id="SPECTRUM"
                name="SPECTRUM"
                onClick={dummyFunction} />
                <label htmlFor="SPECTRUM">SPECTRUM</label>
              </div>
              <div>
                <input
                type="checkbox"
                id="Spot On Networks"
                name="Spot On Networks"
                onClick={dummyFunction} />
                <label htmlFor="Spot On Networks">Spot On Networks</label>
              </div>
              <div>
                <input 
                type="checkbox"
                id="Transit Wireless"
                name="Transit Wireless"
                onClick={dummyFunction} />
                <label htmlFor="Transit Wireless">Transit Wireless</label>
              </div>
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
            <label htmlFor="type" id="arrow">
              Type
            </label>
            {typeClick && (
              <div id="typefilters">
                <input
                  type="checkbox"
                  id="Free"
                  name="Free"
                  onClick={dummyFunction}
                ></input>
                <label htmlFor="Free">Free</label>
                <br></br>
                <input
                  type="checkbox"
                  id="Limited Free"
                  name="Limited Free"
                  onClick={dummyFunction}
                ></input>
                <label htmlFor="Limited Free">Limited Free</label>
                <br></br>
                <input
                  type="checkbox"
                  id="Partner Site"
                  name="Partner Site"
                  onClick={dummyFunction}
                ></input>
                <label htmlFor="Partner Site">Partner Site</label>
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
