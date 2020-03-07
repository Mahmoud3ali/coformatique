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
// import NotFound from "./common/components/NotFound";

import * as serviceWorker from "./serviceWorker";

// import theme from "./common/assets/theme";

let AppWrapper = props => {
  return (
    <React.Fragment>
      <Switch>
        {/* <Route path="/not-found" component={NotFound} /> */}
        <Route path="/" component={App} />
      </Switch>
    </React.Fragment>
  );
};

AppWrapper = withRouter(AppWrapper);
ReactDOM.render(
  // <MuiThemeProvider theme={theme}>
    <Router>
      <AppWrapper />
    </Router>,
  // </MuiThemeProvider>,
  document.getElementById("root")
);
serviceWorker.unregister();