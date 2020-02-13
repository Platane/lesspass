import { useEffect, useState } from "react";
import browser from "../../browser";

export type Options = {
  getTabInfo: boolean;
  getPageInfo: boolean;
  getLoginFields: boolean;
  fillLoginFields: "no" | "submit" | "auto";
  saveMasterPassword: boolean;
  saveProfilesInExtension: "no" | "local" | "sync";
};

export const defaultOptions: Options = {
  getTabInfo: false,
  getPageInfo: false,
  getLoginFields: false,
  fillLoginFields: "no",
  saveMasterPassword: false,
  saveProfilesInExtension: "no"
};

export const useOptions = () => {
  const [options, setOptions] = useState<Options>(defaultOptions);

  // initial read
  useEffect(() => {
    if (!browser.storage) return;

    browser.storage.sync
      .get("options")
      .then(({ options }) => setOptions({ ...defaultOptions, ...options }));
  }, []);

  // listen to changes
  useEffect(() => {
    if (!browser.storage) return;

    const onChange = e => {
      setOptions({ ...defaultOptions, ...e.options.newValue });
    };

    browser.storage.onChanged.addListener(onChange);

    return () => {
      browser.storage.onChanged.removeListener(onChange);
    };
  }, []);

  // set
  useEffect(() => {
    if (!browser.storage) return;

    if (options === defaultOptions) return;

    browser.storage.sync.set({ options });
  }, [options]);

  return { options, setOptions: (o: Options) => setOptions(o) };
};
