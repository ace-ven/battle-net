import React, { useState } from "react";
import "./inputs.scss";
type TextInput = {
  label: String;
  active: Boolean;
  name: any;
  value: any;
  type: String;
  change: (event: any) => any;
  options?: Array<String>;
};

type CheckboxProps = {
  label: string;
  func: any;
  value: any;
};

export const TextInput = (props: TextInput) => {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`input-text-container ${props.value || focused ? "up" : ""}`}
    >
      <label>{props.label}</label>
      <input
        type={"text"}
        name={props.name}
        value={props.value}
        autoComplete="off"
        pattern={props.type === "number" ? "[0-9.]+" : ""}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        onChange={(event) => props.change(event)}
      />
    </div>
  );
};

export const DropInput = (props: TextInput) => {
  const [focused, setFocused] = useState(false);
  const { options, value, label, name } = props;
  const handleSelection = (pick: String) => {
    props.change({ target: { name: name, value: pick } });
    setFocused(false);
  };
  return (
    <div className={`input-text-container ${props.value ? "up" : ""}`}>
      <label className="ddl-label">{label}</label>
      <div
        className="selection input"
        onClick={() => setFocused(true)}
        // onBlur={() => setFocused(false)}
        tabIndex={1}
      >
        {value}
      </div>
      <div className={`drop-list ${focused ? "open" : ""}`}>
        {options?.map((opt: String) => (
          <div
            key={opt as any}
            className={`${value === opt ? "input-active" : ""}`}
            onClick={() => handleSelection(opt)}
            onBlur={() => setFocused(false)}
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
};

type SwitchProps = {
  onSwitch(): any;
  active?: Boolean;
  label?: string;
  bgColor?: string;
};

export const SwitchInput = (props: SwitchProps) => {
  const { bgColor, active, label, onSwitch } = props;
  return (
    <div className={`switch-container ${active ? active : ""} `}>
      {props.label ? <label>{label}</label> : <React.Fragment />}
      <div
        className={`app-switch ${active ? "active" : ""} ${
          active ? bgColor : ""
        }`}
        onClick={onSwitch}
      >
        <div className={`switch-circle ${active ? "active" : ""}`}></div>
      </div>
    </div>
  );
};

export const CheckBox = (props: CheckboxProps) => {
  return (
    <div className="checkbox-container">
      <input type="checkbox" />
      <p>{props.label}</p>
    </div>
  );
};
