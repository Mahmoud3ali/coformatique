import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";

import { App } from "./components";

import * as serviceWorker from "./serviceWorker";

import theme from "./assets/theme";

let AppWrapper = props => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </React.Fragment>
  );
};

AppWrapper = withRouter(AppWrapper);
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router>
      <AppWrapper />
    </Router>
  </MuiThemeProvider>,
  document.getElementById("root")
);
serviceWorker.unregister();
