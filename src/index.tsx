import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

ReactDOM.hydrate(<App />, document.getElementById('react-root'));

if (module['hot']) {
  module['hot'].accept('./app.tsx', () => { console.log('[Development] Enable Hot Module Reload!') })
}