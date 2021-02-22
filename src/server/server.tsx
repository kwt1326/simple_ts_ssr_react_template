import * as React from "react";
import * as ReactDOM from "react-dom/server";
import * as Redux from "redux";
import express from "express";
import path from "path";
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { Helmet } from 'react-helmet';
import { Provider as ReduxProvider } from "react-redux";
import { StaticRouter as Router } from "react-router-dom";

import App from "../pages/app";
import reducer from "../store/reducers/menuReducer";

declare const module: any;

const clientConfig = require('../../webpack/webpack.client.js');
const serverConfig = require('../../webpack/webpack.server.js');

const app = express();
const port = 3000;
const compiler = webpack([clientConfig, serverConfig]);

app.use(express.static(path.join(__dirname, '../dist')));
app.use(webpackDevMiddleware(compiler.compilers[0]))
app.use(webpackHotMiddleware(compiler))

app.get("*", (req: { path: string | object; }, res: { send: (arg0: string) => void; end: () => void; }, next: () => void) => {
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
        <script>window.__PRELOADED_STATE__=${JSON.stringify(initState)};</script>
      </head>
      <body>
        <div id="root">${renderHTML}</div>
        <script src="client-bundle.js"></script>
      </body>
    </html>
  `);
  next();
});

const server = app.listen(port);

// if (module.hot) {
//   module.hot.accept();
//   module.hot.dispose(() => server.close());
// }
