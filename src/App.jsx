import Calculator from "./Calculator";
import "./App.css";
import "./Themes.css";
import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(true);
  return (
    <>
      <div className="app" data-theme={isDark ? "dark" : "light"}>
        <Calculator />
      </div>
    </>
  );
}

export default App;
