import * as React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";

const App = (props: any) => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );
}

export default App