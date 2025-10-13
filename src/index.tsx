import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  //StrictMode:严格模式，但是该模式下有些组件会默认调用两次
  //所以不用<React.StrictMode>
  <App />
);
