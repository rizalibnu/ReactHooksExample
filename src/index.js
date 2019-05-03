import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

// import Hero from "./HeroBasic";
// import Hero from "./HeroHOC";
// import Hero from "./HeroRenderProps";
// import Hero from "./HeroRenderPropsComposer";
import Hero from "./HeroHooks";

function App() {
  return (
    <div className="App">
      <Hero />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
