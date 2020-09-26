import React from "react";
import "./inputs.scss";

type SwitchProps = {
  onSwitch(): any;
  active?: Boolean;
};

export const SwitchInput = (props: SwitchProps) => {
  return (
    <div
      className={`app-switch ${props.active ? "active" : ""}`}
      onClick={props.onSwitch}
    >
      <div className={`switch-circle ${props.active ? "active" : ""}`}></div>
    </div>
  );
};
