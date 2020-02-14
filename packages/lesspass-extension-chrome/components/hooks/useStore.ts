import { useEffect, useState } from "react";
import browser from "../../browser";
import { Options } from "./useOptions";
import { useDebouncedEffect } from "./useDebouncedEffect";

export const useAccount = (options: Options) => {
  const [account, setAccount] = useState<Account>(defaultAccount);

  // get host
  useEffect(() => {
    if (!options.getTabInfo) return;
    if (account.host !== defaultAccount.host) return;

    browser.runtime.sendMessage({ type: "background:tabInfo" }).then(res => {
      if (res) setAccount(a => ({ ...a, host: res.host }));
    });
  }, [options.getTabInfo]);

  // get login
  useEffect(() => {
    if (!options.getLoginFields) return;
    if (account.login !== defaultAccount.login) return;

    browser.runtime
      .sendMessage({ type: "content:loginFields:get" })
      .then(res => {
        if (res) setAccount(a => ({ ...a, login: res.login }));
      });
  }, [options.getLoginFields]);

  // get master password
  useEffect(() => {
    if (!options.saveMasterPassword) return;
    if (account.masterPassword !== defaultAccount.masterPassword) return;

    browser.runtime
      .sendMessage({ type: "background:masterPassword:get" })
      .then(res => {
        if (res)
          setAccount(a => ({ ...a, masterPassword: res.masterPassword }));
      });
  }, [options.saveMasterPassword]);

  // auto save
  useDebouncedEffect(
    () => {
      if (!options.saveMasterPassword) return;
      if (account.masterPassword === defaultAccount.masterPassword) return;

      browser.runtime.sendMessage({
        type: "background:masterPassword:set",
        masterPassword: account.masterPassword
      });
    },
    [account.masterPassword, options.saveMasterPassword],
    500
  );

  return { account, setAccount: (a: Account) => setAccount(a) };
};

const defaultParams: Params = {
  lowercase: true,
  uppercase: true,
  symbols: true,
  numbers: true,
  length: 16
};

const defaultAccount = {
  host: "",
  login: "",
  masterPassword: "",
  i: 0,
  profile: defaultProfile
};

export type Profile = {
  i: number;
  login: string;
  host: string;
  params: Params;
};

export type Params = {
  lowercase: boolean;
  uppercase: boolean;
  symbols: boolean;
  numbers: boolean;
  length: number;
};

export type Account = {
  host: string;
  login: string;
  masterPassword: string;
  i: number;
  profile: Profile;
};

export type State = {
  options:
    | { status: "ready"; value: Options }
    | { status: "reading" }
    | { status: "void" };

  login: {
    fromPrevious:
      | { status: "ready"; value: string }
      | { status: "reading" }
      | { status: "void" };
    fromPage:
      | { status: "ready"; value: string }
      | { status: "reading" }
      | { status: "void" };
    form: string;
  };

  host: {
    fromPage:
      | { status: "ready"; value: string }
      | { status: "reading" }
      | { status: "void" };
    form: string;
  };

  masterPassword: {
    fromCache:
      | { status: "ready"; value: string }
      | { status: "reading" }
      | { status: "void" };
    form: string;
  };

  profiles:
    | { status: "ready"; value: Profile[] }
    | { status: "reading" }
    | { status: "void" };
};

type Action = any;

const reduce = (state: State, action: Action): State => {
  switch (action.type) {
    case "profile:storage:read":
      return {
        ...state,
        profiles: { status: "ready", value: action.profiles }
      };

    default:
      return state;
  }
};
