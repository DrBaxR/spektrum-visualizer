import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { getData } from "./data/getData";

getData().then(data => {
  const root = ReactDOM.createRoot(document.getElementById(
    "root"
  ) as HTMLElement);

  root.render(
    <React.StrictMode>
      <div />
      <App data={data} />
    </React.StrictMode>
  );
});
