import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../Avatar/Avatar";
import RegularBtn from "../../Buttons/Buttons";
import SearchComponent from "../../Search/Search";
import AppLogo from "../AppLogo/AppLogo";

const AppHeader = () => {
  const isLoogedIn = true;
  return (
    <nav className="app-header">
      <div className="left">
        <div className="app-brand margin-medium">
          <AppLogo />
        </div>
        <div className="app-header-navigation">
          <Link to="/create">Create</Link>
          <Link to="/news">News</Link>
        </div>
      </div>
      <div className="app-header-action right">
        <SearchComponent />
        {isLoogedIn ? (
          <Avatar />
        ) : (
          <>
            <RegularBtn
              text={"Sign In"}
              fn={() => {}}
              color={"black"}
              bold={true}
              //   fill={"black"}
            />
            <RegularBtn
              text={"Register"}
              fn={() => {}}
              bold={true}
              color={"white"}
              fill={"black"}
              rounded={true}
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default AppHeader;
