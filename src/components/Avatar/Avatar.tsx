import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SwitchInput } from "../inputs/SwitchInput";
import "./Avatar.scss";

const Avatar = (props: any) => {
  const [shodDDL, setDDLStatus] = useState(true);
  return (
    <div
      className="avatar-container"
      onClick={() => setDDLStatus(!shodDDL)}
      tabIndex={1}
    >
      <div className={`avatar-ddl ${shodDDL ? "visible" : "hidden"}`}>
        <AvatarDDL
          show={(status) => setDDLStatus(status)}
          fn={props.changeTheme}
          isDarkMode={props.isDarkMode}
        />
      </div>
    </div>
  );
};

type AvatarDDLProps = {
  show(status: boolean): void;
  fn?: any;
  isDarkMode?: Boolean;
};

const AvatarDDL = (props: AvatarDDLProps) => {
  const elements: Array<any> = [
    { name: "Profile" },
    { name: "History" },
    {
      name: "Dark Mode",
      component: <SwitchInput active={props.isDarkMode} onSwitch={props.fn} />,
    },
    { name: "Log out" },
  ];
  return (
    <div className="list">
      {elements.map((elem) => (
        <div className="item" onClick={() => props.show(false)} key={elem.name}>
          {elem.component ? (
            <a>
              <p>{elem.name}</p>
              {elem.component}
            </a>
          ) : (
            <Link to={elem.name}>
              <p>{elem.name}</p>
              {elem.component ? elem.component : <React.Fragment />}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Avatar;
