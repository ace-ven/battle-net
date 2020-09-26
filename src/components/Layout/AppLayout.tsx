import React from "react";
import AppRouter from "../AppRouter";
import "./AppLayout.scss";
import { connect } from "react-redux";
type AppLayoutProps = {
  darkMode?: boolean;
};

const AppLayout = (props: AppLayoutProps) => {
  const { darkMode = false } = props;
  return (
    <div className={`app-layout ${darkMode ? "dark" : ""}`}>
      <div className={`content`}>
        <AppRouter />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  console.log(state);
  return {
    darkMode: state.UI.darkMode,
  };
};
export default connect(mapStateToProps)(AppLayout);
