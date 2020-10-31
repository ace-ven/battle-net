import React, { useEffect, useState } from "react";
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
import Worker from "../workers";
import Challenge from "../pages/Challenge/Challenge";
export const history = createBrowserHistory();

const AppRouter: React.FC = () => {
  const [isFullMode, setFullMode] = useState(false);
  useEffect(() => {
    setFullMode(!!history.location.pathname.includes("challenge"));
  }, []);

  history.listen((location, action) => {
    setFullMode(!!location.pathname.includes("challenge"));
  });

  return (
    <Router history={history}>
      {!isFullMode ? (
        <>
          <Switch>
            <div className="layout">
              <AppHeader />
              <Route path="/" component={HomePage} exact={true} />
              <Route path="/create" component={Create} exact={true} />
              {/* <Route path="/challenge" component={Challenge} exact={true} /> */}
            </div>
          </Switch>
        </>
      ) : (
        <>
          <Switch>
            <div className="editor">
              <AppHeader isEditor={true} />
              <Route path="/challenge" component={Challenge} exact={true} />
            </div>
          </Switch>
        </>
      )}
    </Router>
  );
};

export default AppRouter;
