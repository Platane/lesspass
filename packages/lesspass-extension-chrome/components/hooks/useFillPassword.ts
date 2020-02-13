import browser from "../../browser";

export const fillPassword = (login, password) =>
  browser.runtime.sendMessage({
    type: "content:loginFields:fill",
    login,
    password
  });

export const submitPassword = (login, password) =>
  browser.runtime.sendMessage({
    type: "content:loginFields:submit",
    login,
    password
  });
