import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [providerClick, setProviderClick] = useState(false);
  const [typeClick, setTypeClick] = useState(false);

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
            {providerClick && <div>I GOT CLICKED</div>}
          </div>
          <div>
            <input
              type="checkbox"
              id="type"
              name="type"
              onClick={moreType}
            ></input>
            <label for="type">Type</label>
            {typeClick && <div>I GOT CLICKED</div>}
          </div>
        </div>
        <img src="./test.PNG"></img>
      </div>
    </div>
  );
}

export default App;
