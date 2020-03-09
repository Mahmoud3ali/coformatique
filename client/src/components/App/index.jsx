import React from "react";
import { Switch, Route } from "react-router-dom";

import { LoginPage, NotFoundPage, HomePage, SignUpPage } from "../../pages";

const App = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={LoginPage} />
      <Route exact path={"/home"} component={HomePage} />
      <Route exact path={"/signup"} component={SignUpPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default App;
