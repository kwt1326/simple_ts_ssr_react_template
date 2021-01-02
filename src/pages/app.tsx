import * as React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Home";

export default class App extends React.Component {
  public render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    );
  }
}
