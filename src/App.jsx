import Calculator from "./Calculator";
import "./App.css";
import "./Themes.css";
// import ."./ThemeSlider.css"
import { useState } from "react";

function App() {
  return (
    <>
      <div className="app">
        <Calculator />
      </div>
    </>
  );
}

export default App;
