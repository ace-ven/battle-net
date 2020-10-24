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

type ChallengeActionProps = {
  img?: any;
  isBeta?: boolean;
} & ButtonProps;

export const RegularBtn = (props: ButtonProps) => {
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
      className={`btn ${rounded ? "rounded" : ""}`}
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

export const ChallengeActionBtn = (props: ChallengeActionProps) => {
  return (
    <button className={`challenge-btn ${props.color}`}>
      {props.text}
      {props.isBeta ? <div className="beta">SOON!</div> : <></>}
    </button>
  );
};

// export default RegularBtn;
