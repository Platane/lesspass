import { useEffect, useState, useRef } from "react";
import browser from "../../browser";
import { Options } from "./useOptions";
import { useDebouncedEffect } from "./useDebouncedEffect";

export const useMasterPassword = (
  options: Pick<Options, "saveMasterPassword">
) => {
  const fromStorage = useRef<any>();
  const [masterPassword, setMasterPassword] = useState<string>("");

  // get master password
  useEffect(() => {
    if (!options.saveMasterPassword) return;
    if (masterPassword) return;

    browser.runtime
      .sendMessage({ type: "background:masterPassword:get" })
      .then(res => {
        console.log("get", res);

        if (res && res.masterPassword)
          setMasterPassword((fromStorage.current = res.masterPassword));
      });
  }, [options.saveMasterPassword]);

  // auto save
  useDebouncedEffect(
    () => {
      if (!options.saveMasterPassword) return;
      if (!masterPassword) return;
      if (fromStorage.current === masterPassword) return;

      console.log("save", masterPassword);

      browser.runtime.sendMessage({
        type: "background:masterPassword:set",
        masterPassword
      });
    },
    [masterPassword, options.saveMasterPassword],
    500
  );

  return { masterPassword, setMasterPassword };
};
