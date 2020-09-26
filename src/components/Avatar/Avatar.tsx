import React, { useState } from "react";
import "./Avatar.scss";

const Avatar = () => {
  const [shodDDL, setDDLStatus] = useState(false);
  return (
    <div
      className="avatar-container"
      onClick={() => setDDLStatus(!shodDDL)}
      onBlur={() => setDDLStatus(!shodDDL)}
      tabIndex={1}
    >
      <div className={`avatar-ddl ${shodDDL ? "visible" : "hidden"}`}>
        <AvatarDDL show={(status) => setDDLStatus(status)} />
      </div>
    </div>
  );
};

type AvatarDDLProps = {
  show(status: boolean): void;
};

const AvatarDDL = (props: AvatarDDLProps) => {
  const elements: Array<string> = ["Profile", "History", "Log out"];
  return (
    <div className="list">
      {elements.map((elem) => (
        <div className="item" onClick={() => props.show(false)}>
          {elem}
        </div>
      ))}
    </div>
  );
};

export default Avatar;
