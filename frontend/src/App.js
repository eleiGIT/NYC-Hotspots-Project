import "./App.css";

function App() {
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
            <button></button>
            Provider
          </div>
          <div>
            <button></button>
            Type
          </div>
        </div>
        <img src="./test.PNG"></img>
      </div>
    </div>
  );
}

export default App;
