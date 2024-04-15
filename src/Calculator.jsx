import React, { useState, useEffect } from "react";
import Display from "./Display";
import Button from "./Button";
import "./App.css";
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

  const numb = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];

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
        {numb.map((num) => (
          <Button
            key={num}
            value={num}
            onClick={() => handleClick(num)}
            className="button"
          />
        ))}
        <Button
          value="DEL"
          onClick={() => handleClick("DEL")}
          className="button del"
        />
        <Button
          value="+"
          onClick={() => handleClick("+")}
          className="button plus"
        />
        <Button
          value="-"
          onClick={() => handleClick("-")}
          className="button minus"
        />
        <Button
          value="."
          onClick={() => handleClick(".")}
          className="button coma"
        />
        <Button
          value="*"
          onClick={() => handleClick("*")}
          className="button times"
        />
        <Button
          value="/"
          onClick={() => handleClick("/")}
          className="button divide"
        />
        <Button
          value="RESET"
          onClick={() => handleClick("RESET")}
          className="button reset"
        />
        <Button
          value="="
          onClick={() => handleClick("=")}
          className="button equal"
        />
      </div>
    </div>
  );
}
