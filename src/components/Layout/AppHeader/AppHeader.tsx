import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { changeTheme } from "../../../store/actions/UI.actions";
import Avatar from "../../Avatar/Avatar";
import RegularBtn from "../../Buttons/Buttons";
import SearchComponent from "../../Search/Search";
import AppLogo from "../AppLogo/AppLogo";

const AppHeader = (props: any) => {
  const [isLoogedIn, setLogin] = useState(false);
  return (
    <header className="app-header-container">
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
            <Avatar
              changeTheme={props.changeTheme}
              isDarkMode={props.UI.darkMode}
            />
          ) : (
            <>
              <RegularBtn
                text={"Sign In"}
                fn={() => setLogin(true)}
                color={"black"}
                bold={true}
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
    </header>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeTheme: () => dispatch(changeTheme()),
  };
};

const mapStateToProps = (state: any) => {
  return {
    UI: state.UI,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
