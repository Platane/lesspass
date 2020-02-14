import { useEffect, useState, useRef } from "react";
import browser from "../../browser";

export type Options = {
  getTabInfo: boolean;
  getPageInfo: boolean;
  getLoginFields: boolean;
  fillLoginFields: "no" | "submit" | "auto";
  saveMasterPassword: boolean;
  profileStorage:
    | null
    | { type: "extension-sync" }
    | { type: "extension-local" }
    | { type: "lesspass"; accessToken: string };
};

export const defaultOptions: Options = {
  getTabInfo: false,
  getPageInfo: false,
  getLoginFields: false,
  fillLoginFields: "no",
  saveMasterPassword: false,
  profileStorage: { type: "extension-sync" }
};

export const useOptions = () => {
  const fromStorage = useRef<any>();
  const [options, setOptions] = useState<Options>(defaultOptions);

  // read
  useEffect(() => {
    if (!browser.storage) return;

    // initial read
    browser.storage.sync.get("options").then(({ options }) => {
      setOptions((fromStorage.current = { ...defaultOptions, ...options }));
    });

    // listen
    const onChange = changes => {
      if (changes.options)
        setOptions((fromStorage.current = changes.options.newValue));
    };
    browser.storage.onChanged.addListener(onChange);
    return () => browser.storage.onChanged.removeListener(onChange);
  }, []);

  // write
  useEffect(() => {
    if (!browser.storage) return;

    if (!fromStorage.current) return;

    if (fromStorage.current === options) return;

    browser.storage.sync.set({ options });
  }, [options]);

  return {
    options,
    setOptions: (o: Partial<Options>) => setOptions({ ...options, ...o })
  };
};
