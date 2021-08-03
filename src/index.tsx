import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

const renderRoot = () => ReactDOM.hydrate(<App />, document.getElementById('react-root'));

if (process.env.NODE_ENV === 'development' && module['hot']) {
  module['hot'].accept('./app', renderRoot)
}