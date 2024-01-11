import React, { useEffect, useState } from "react";

// NOTE: t is rare but sometimes the background and text color can  be same since itis completely random
const Clock = () => {
  let time = new Date().toLocaleTimeString();
  const [curTime, setCurTime] = useState(time);
  const [bgColor, setBgColor] = useState("#fff");
  const [textColor, setTextColor] = useState("black");

  const updateTime = () => {
    let time = new Date().toLocaleTimeString();
    setCurTime(time);
  };

  // Generate a random color in rgb
  const generateRGBColor = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let val = `rgb(${r}, ${g}, ${b})`;
    return val;
  };

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setBgColor(generateRGBColor());
      setTextColor(generateRGBColor());
    }, 10000);

    // Cleanup the interval when the component unmounts
    return () => clearTimeout(intervalId);
  }, [textColor]);

  setInterval(() => updateTime(), 1000);
  return (
    <div
      className="clock-container"
      style={{ background: bgColor, color: textColor }}
    >
      <h2>Clock</h2>
      <h1>{curTime}</h1>
    </div>
  );
};

export default Clock;
