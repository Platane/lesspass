import { useEffect, useState } from "react";
import browser from "../../browser";

export const useAccount = () => {
  const [account, setAccount] = useState<Account>({
    host: "",
    login: "",
    masterPassword: "",
    i: 0,
    profile: defaultProfile
  });

  useEffect(() => {
    browser.runtime
      .sendMessage({ type: "background:tabInfo" })
      .then(x => setAccount(a => ({ ...a, ...x })));

    browser.runtime
      .sendMessage({ type: "content:pageInfo" })
      .then(x => setAccount(a => ({ ...a, ...x })));

    browser.runtime
      .sendMessage({ type: "content:loginFields:get" })
      .then(x => setAccount(a => ({ ...a, ...x })));
  }, []);

  return { account, setAccount: (a: Account) => setAccount(a) };
};

const defaultProfile = {
  lowercase: true,
  uppercase: true,
  symbols: true,
  numbers: true,
  length: 16
};

export type Profile = {
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
