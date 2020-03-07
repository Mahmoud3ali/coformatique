import React from "react";
import { Switch, Route } from "react-router-dom";

import { LoginScreen } from "../../screens";
const App = () => {
  return (
    <Switch>
      <Route path={`/`} component={LoginScreen} />
    </Switch>
  );
};

export default App;
