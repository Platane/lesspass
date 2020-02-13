import React from "react";
import { render } from "react-dom";
import { Popup } from "./components/_Popup";

export const init = () => {
  const rootElement = document.createElement("div");
  document.body.appendChild(rootElement);
  render(<Popup />, rootElement);
};

init();
