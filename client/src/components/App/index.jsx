import React from "react";
import { Switch, Route } from "react-router-dom";

import { LoginPage, NotFoundPage } from "../../pages";
const App = () => {
  return (
    <Switch>
      <Route exact path={`/`} component={LoginPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default App;
