import React from "react";

function ThemeToggle({ currentTheme, toggleTheme }) {
  return <button onClick={toggleTheme}>Toggle Theme</button>;
}

export default ThemeToggle;
