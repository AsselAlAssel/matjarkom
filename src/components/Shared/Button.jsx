import React from "react";

const Button = ({
  text,
  bgColor,
  textColor,
  onClick = () => {},
  onMouseEnter = () => {},
}) => {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} ${textColor} cursor-pointer hover:scale-105 duration-300 py-2 px-8 rounded-full relative z-10`}
      onMouseEnter={onMouseEnter}
    >
      {text}
    </button>
  );
};

export default Button;
