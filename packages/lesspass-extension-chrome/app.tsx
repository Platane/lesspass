import React from "react";
import { render } from "react-dom";
import { App } from "./components/_App";

export const init = () => {
  const rootElement = document.createElement("div");
  document.body.appendChild(rootElement);
  render(<App />, rootElement);
};

init();
