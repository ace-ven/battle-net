import React from "react";
import "./Buttons.scss";

type ButtonProps = {
  text: string;
  rounded?: true;
  fill?: string;
  color?: string;
  empty?: boolean;
  borderColor?: string;
  bold?: boolean;
  borderWidth?: string;
  fn(): any;
  disabled?: boolean;
};

const RegularBtn = (props: ButtonProps) => {
  const {
    text,
    fn,
    rounded = false,
    disabled = false,
    fill,
    color,
    bold,
    borderColor = "transparent",
    borderWidth = "1px",
  } = props;
  return (
    <button
      className={`${rounded ? "rounded" : ""}`}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "#ffa50073" : fill,
        color: color,
        borderColor: borderColor,
        fontWeight: bold ? "bold" : 400,
        borderWidth: borderWidth,
      }}
      onClick={fn}
    >
      {text}
    </button>
  );
};

export default RegularBtn;
