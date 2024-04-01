import React from "react";

export default function Display({ value }) {
  return (
    <div className="display">
      <input dir="rtl" type="text" value={value} readOnly />
    </div>
  );
}
