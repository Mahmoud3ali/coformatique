import React from "react";
import { Switch, Route } from "react-router-dom";

import { LoginPage, NotFoundPage, HomePage } from "../../pages";

const App = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={LoginPage} />
      <Route exact path={"/home"} component={HomePage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default App;
