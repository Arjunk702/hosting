import React from "react";
import TextFlagCursor from "./TextFlagCursor.jsx";

function TextFlagCursorExample() {
  // Replace theme logic with a simple example or use CSS for light/dark mode
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <div>
      <TextFlagCursor
        text="abhinadh oru funda"
        color={isDarkMode ? "#FFFFFF" : "#000000"}
        font="monospace"
        textSize={12}
      />
    </div>
  );
}

export default TextFlagCursorExample;
