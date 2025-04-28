import "./App.css";
import { useState, useEffect } from "react";
import Map from "./Map";

function App() {
  const [providerClick, setProviderClick] = useState(false);
  const [typeClick, setTypeClick] = useState(false);
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [pFilters, setpFilters] = useState([]);
  const [tFilters, settFilters] = useState([]);
  const [zip, setZip] = useState("");

  useEffect(() => {
    fetch("/api/hotspots")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  const thandleFilters = (e) => {
    const { id } = e.target;
    if (!tFilters.includes(id)) {
      console.log(id);
      taddFilters(id);
    } else {
      const index = tFilters.findIndex((filter) => filter === id);
      tremoveFilters(index);
    }
  };

  const taddFilters = (filtername) => {
    settFilters((f) => [...f, filtername]);
  };

  const tremoveFilters = (index) => {
    settFilters(tFilters.filter((_, i) => i !== index));
  };

  const phandleFilters = (e) => {
    const { id } = e.target;
    if (!pFilters.includes(id)) {
      console.log(id);
      paddFilters(id);
    } else {
      const index = pFilters.findIndex((filter) => filter === id);
      premoveFilters(index);
    }
  };

  const paddFilters = (filtername) => {
    setpFilters((f) => [...f, filtername]);
  };

  const premoveFilters = (index) => {
    setpFilters(pFilters.filter((_, i) => i !== index));
  };

  const submitZip = async () => {
    const inputData = input;
    setZip(input);
    const params = new URLSearchParams({
      provider: pFilters.join(","),
      type: tFilters.join(","),
    }).toString();

    fetch(`/api/hotspots/zip/${inputData}?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((e) => {
        console.error(e);
        setData([]);
      });
    setInput("");
  };

  useEffect(() => {
    const params = new URLSearchParams({
      provider: pFilters.join(","),
      type: tFilters.join(","),
    }).toString();

    if (zip) {
      fetch(`/api/hotspots/zip/${zip}?${params}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          console.log(data);
        })
        .catch((e) => {
          console.error(e);
          setData([]);
        });
    } else {
      fetch(`/api/hotspots?${params}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          console.log(data);
        })
        .catch((e) => {
          console.error(e);
          setData([]);
        });
    }
  }, [pFilters, tFilters]);

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
      <div id="submit">
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
      </div>
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
                    onClick={phandleFilters}
                  />
                  <label htmlFor="ALTICEUSA">ALTICEUSA</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="AT&T"
                    name="AT&T"
                    onClick={phandleFilters}
                  />
                  <label htmlFor="AT&T">AT&T</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="BPL"
                    name="BPL"
                    onClick={phandleFilters}
                  />
                  <label htmlFor="BPL">BPL</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="Chelsea"
                    name="Chelsea"
                    onClick={phandleFilters}
                  />
                  <label htmlFor="Chelsea">Chelsea</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="City Tech"
                    name="City Tech"
                    onClick={phandleFilters}
                  />
                  <label htmlFor="City Tech">City Tech</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="Downtown Brooklyn"
                    name="Downtown Brooklyn"
                    onClick={phandleFilters}
                  />
                  <label htmlFor="Downtown Brooklyn">Downtown Brooklyn</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="Fiberless"
                    name="Fiberless"
                    onClick={phandleFilters}
                  />
                  <label htmlFor="Fiberless">Fiberless</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="Harlem"
                    name="Harlem"
                    onClick={phandleFilters}
                  />
                  <label htmlFor="Harlem">Harlem</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="LinkNYC - Citybridge"
                    name="LinkNYC - Citybridge"
                    onClick={phandleFilters}
                  />
                  <label htmlFor="LinkNYC - Citybridge">
                    LinkNYC - Citybridge
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="Manhattan Down Alliance"
                    name="Manhattan Down Alliance"
                    onClick={phandleFilters}
                  />
                  <label htmlFor="Manhattan Down Alliance">
                    Manhattan Down Alliance
                  </label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="NYCHA"
                    name="NYCHA"
                    onClick={phandleFilters}
                  />
                  <label htmlFor="NYCHA">NYCHA</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="NYPL"
                    name="NYPL"
                    onClick={phandleFilters}
                  />
                  <label htmlFor="NYPL">NYPL</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="Partner"
                    name="Partner"
                    onClick={phandleFilters}
                  />
                  <label htmlFor="Partner">Partner</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="QPL"
                    name="QPL"
                    onClick={phandleFilters}
                  />
                  <label htmlFor="QPL">QPL</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="SPECTRUM"
                    name="SPECTRUM"
                    onClick={phandleFilters}
                  />
                  <label htmlFor="SPECTRUM">SPECTRUM</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="Spot On Networks"
                    name="Spot On Networks"
                    onClick={phandleFilters}
                  />
                  <label htmlFor="Spot On Networks">Spot On Networks</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="Transit Wireless"
                    name="Transit Wireless"
                    onClick={phandleFilters}
                  />
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
                  onClick={thandleFilters}
                ></input>
                <label htmlFor="Free">Free</label>
                <br></br>
                <input
                  type="checkbox"
                  id="Limited Free"
                  name="Limited Free"
                  onClick={thandleFilters}
                ></input>
                <label htmlFor="Limited Free">Limited Free</label>
                <br></br>
                <input
                  type="checkbox"
                  id="Partner Site"
                  name="Partner Site"
                  onClick={thandleFilters}
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
