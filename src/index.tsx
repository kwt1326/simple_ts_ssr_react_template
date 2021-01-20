import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Redux from "redux";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./pages/app";
import reducer from "./store/reducers/menuReducer";

const preloadedState = (window as any)["__PRELOADED_STATE__"];
delete (window as any)["__PRELOADED_STATE__"];

const store = Redux.createStore(reducer, JSON.parse(preloadedState));

const render = (Component: any) => {
  ReactDOM.hydrate(
    <ReduxProvider store={store}>
      <Router>
        <Component />
        <div>client</div>
      </Router>
    </ReduxProvider>,
    document.getElementById("root")
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./pages/app.tsx', () => {
    const appRoot = require('./pages/app.tsx').default;
    render(appRoot);
  });
}