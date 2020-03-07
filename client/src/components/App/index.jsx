import React from "react";
import { Switch, Route } from "react-router-dom";

import { LoginScreen, NotFoundScreen } from "../../pages";
const App = () => {
  return (
    <Switch>
      <Route exact path={`/`} component={LoginScreen} />
      <Route component={NotFoundScreen} />
    </Switch>
  );
};

export default App;
