import React from "react";
import {
  Router,
  Route,
  Switch,
  // Link, NavLink
} from "react-router-dom";
import { createBrowserHistory } from "history";
import HomePage from "../pages/Home/Home";
import AppHeader from "./Layout/AppHeader/AppHeader";

export const history = createBrowserHistory();

const AppRouter: React.FC = () => {
  return (
    <div className="layout">
      <Router history={history}>
        <AppHeader />
        <Switch>
          <Route path="/" component={HomePage} exact={true} />
        </Switch>
      </Router>
    </div>
  );
};

export default AppRouter;
