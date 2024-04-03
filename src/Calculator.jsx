import React, { useState } from "react";
import Display from "./Display";
import "./ThemeSlider.css";

export default function Calculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [theme, setTheme] = useState("light");

  const themes = ["light", "dark", "gray"];

  const handleThemeChange = (value) => {
    const newTheme = themes[value];
    setTheme(newTheme);
  };

  const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  };

  const handleClick = (value) => {
    if (!isNaN(value) || value === ".") {
      // If value is a number or a decimal point
      if (waitingForOperand) {
        setDisplayValue(value);
        setWaitingForOperand(false);
      } else {
        setDisplayValue((prevValue) =>
          prevValue === "0" ? value : prevValue + value
        );
      }
    } else if (value in operators) {
      if (!waitingForOperand) {
        setOperator(value);
        setPreviousValue(displayValue);
        setWaitingForOperand(true);
      }
    } else if (value === "=") {
      // equals sign
      if (operator && previousValue !== null && !waitingForOperand) {
        const result = operators[operator](
          parseFloat(previousValue),
          parseFloat(displayValue)
        );
        setDisplayValue(result.toString());
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(true);
      }
    } else if (value === "C") {
      // clear button
      setDisplayValue("0");
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(false);
    } else if (value === "DEL") {
      // delete button
      setDisplayValue((prevValue) =>
        prevValue.length === 1 ? "0" : prevValue.slice(0, -1)
      );
    } else if (value === "RESET") {
      // reset button
      setDisplayValue("0");
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(false);
    }
  };

  return (
    <div className={`calculator ${theme}`}>
      <div className="calc-cont">
        <div className="calc">calc</div>
        <div className="theme-slider">
          <input
            type="range"
            min="0"
            max={themes.length - 1}
            value={themes.indexOf(theme)}
            onChange={(e) => handleThemeChange(e.target.value)}
            step="1"
          />
        </div>
      </div>

      <Display value={displayValue} />
      <div className="buttons">
        <button className="button" onClick={() => handleClick("7")}>
          7
        </button>
        <button className="button" onClick={() => handleClick("8")}>
          8
        </button>
        <button className="button" onClick={() => handleClick("9")}>
          9
        </button>
        <button className="button del" onClick={() => handleClick("DEL")}>
          DEL
        </button>
        <button className="button" onClick={() => handleClick("4")}>
          4
        </button>
        <button className="button" onClick={() => handleClick("5")}>
          5
        </button>
        <button className="button" onClick={() => handleClick("6")}>
          6
        </button>
        <button className="button" onClick={() => handleClick("+")}>
          +
        </button>
        <button className="button" onClick={() => handleClick("1")}>
          1
        </button>
        <button className="button" onClick={() => handleClick("2")}>
          2
        </button>
        <button className="button" onClick={() => handleClick("3")}>
          3
        </button>
        <button className="button" onClick={() => handleClick("-")}>
          -
        </button>
        <button className="button" onClick={() => handleClick(".")}>
          .
        </button>
        <button className="button" onClick={() => handleClick("0")}>
          0
        </button>
        <button className="button" onClick={() => handleClick("/")}>
          /
        </button>
        <button className="button" onClick={() => handleClick("*")}>
          x
        </button>
        <button className="button reset" onClick={() => handleClick("RESET")}>
          RESET
        </button>
        <button className="button equal" onClick={() => handleClick("=")}>
          =
        </button>
      </div>
    </div>
  );
}
