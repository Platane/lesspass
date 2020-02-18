import { useEffect, useState } from "react";
import browser from "../../browser";
import { Options } from "./useOptions";
import { defaultParams } from "../../types";

const getInitialAccount = async (options: Options) => {
  const [currentHost, currentLogin, previousState] = await Promise.all([
    options.getTabInfo
      ? browser.runtime
          .sendMessage({ type: "background:tabInfo" })
          .catch(err => console.error(err))
          .then(res => (res && res.host) || undefined)
      : undefined,

    options.getLoginFields
      ? browser.runtime
          .sendMessage({ type: "content:loginFields:get" })
          .catch(err => console.error(err))
          .then(res => (res && res.login) || undefined)
      : undefined,

    browser.storage &&
      browser.storage.local
        .get("previousState")
        .catch(err => console.error(err))
        .then(res => res && res.previousState)
  ]);

  const host =
    currentHost || (previousState && previousState.host) || undefined;

  const login =
    currentLogin ||
    (previousState && previousState.host === host && previousState.login) ||
    undefined;

  const params =
    (previousState && previousState.host === host && previousState.params) ||
    undefined;

  return { host, login, params };
};

// read the host on the page
export const useAccount = options => {
  const [state, setState] = useState({
    account: defaultAccount,
    inited: false,
    touched: false
  });

  useEffect(() => {
    if (!options) return;

    getInitialAccount(options).then(initialAccount => {
      setState(state => {
        if (state.touched) return state;

        return {
          ...state,
          inited: true,
          account: {
            host: initialAccount.host || state.account.host,
            login: initialAccount.login || state.account.login,
            params: initialAccount.params || state.account.params
          }
        };
      });
    });
  }, [options]);

  useEffect(() => {
    if (!state.inited) return;

    if (!browser.storage) return;

    browser.storage.local
      .set({ previousState: state.account })
      .catch(err => console.error(err));
  }, [state]);

  return {
    ...state,
    setAccount: (a: Partial<Account>) =>
      setState(state => ({
        ...state,
        touched: true,
        account: { ...state.account, ...a }
      }))
  };
};

const defaultAccount = {
  host: "",
  login: "",
  params: defaultParams
};
