import React from "react";
import AppRouter from "../AppRouter";
import "./AppLayout.scss";

type AppLayoutProps = {
  darkMode?: boolean;
};

const AppLayout = (props: AppLayoutProps) => {
  const { darkMode = false } = props;
  return (
    <div className="app-layout">
      <div className={`content ${darkMode ? "dark" : ""}`}>
        <AppRouter />
      </div>
    </div>
  );
};

export default AppLayout;
