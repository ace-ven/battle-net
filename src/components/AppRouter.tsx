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
import Create from "../pages/Create/Create";

export const history = createBrowserHistory();

const AppRouter: React.FC = () => {
  return (
    <Router history={history}>
      <AppHeader />
      <div className="layout">
        <Switch>
          <Route path="/" component={HomePage} exact={true} />
          <Route path="/create" component={Create} exact={true} />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
