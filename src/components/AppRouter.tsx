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
import Challenge from "../pages/Challenge/Challenge";
export const history = createBrowserHistory();

const AppRouter: React.FC = () => {
  return (
    <Router history={history}>
      <AppHeader />
      <Switch>
        <div className="layout">
          <Route path="/" component={HomePage} exact={true} />
          <Route path="/create" component={Create} exact={true} />
          {/* <Route path="/challenge" component={Challenge} exact={true} /> */}
        </div>
      </Switch>

      <Switch>
        <div className="editor">
          <Route path="/challenge" component={Challenge} exact={true} />
        </div>
      </Switch>
    </Router>
  );
};

export default AppRouter;
