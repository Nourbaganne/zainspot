import React from "react";

const HighlightText = ({ text }) => {
  const highlightedWord = "ZainSpot"; // The word to highlight
  const parts = text.split(new RegExp(`(${highlightedWord})`, "gi"));

  return (
    <p className="font-sans font-extrabold text-xl md:text-[27px]">
      {parts.map((part, index) =>
        part.toLowerCase() === highlightedWord.toLowerCase() ? (
          <span key={index} className="text-primary">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </p>
  );
};

export default HighlightText;
