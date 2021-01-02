import * as React from "react";
import * as ReactDOM from "react-dom/server";
import * as Express from "express";
import * as Redux from "redux";
import { Helmet } from 'react-helmet';
import { Provider as ReduxProvider } from "react-redux";
import { StaticRouter as Router } from "react-router-dom";

import App from "../src/pages/app";
import reducer from "../src/store/reducers/menuReducer";

declare const module: any;

const express = Express();
const port = 3000;

express.use(Express.static("build"));

express.get("/*", (req, res, next) => {
  const helmet = Helmet.renderStatic();
  const store = Redux.createStore(reducer);
  const renderHTML = ReactDOM.renderToString(
    <ReduxProvider store={store}>
      <Router location={req.path} context={{}}>
        <App />
      </Router>
    </ReduxProvider>
  );

  const initState = JSON.stringify(store.getState()).replace(
    /</g,
    "\\u003c"
  );

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <base href="/" />
        <title>TypeScript ReactJS SSR App</title>
        <style>
            body {
                margin: 0px;
                padding: 0px;
            }
        </style>
        <meta name="viewport" content="width=device-width, user-scalable=no">
        <meta name="google" content="notranslate">
        ${helmet.title.toString()}
      </head>
      <body>
        <main id="root">${renderHTML}</main>
        <script>
            window["__PRELOADED_STATE__"] = ${initState}
        </script>
        <script type="application/javascript" src="client-bundle.js"></script>
      </body>
    </html>
  `);
  res.end();
  next();
});

const server = express.listen(port);

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
