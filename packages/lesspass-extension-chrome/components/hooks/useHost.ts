import { useEffect, useState, useRef } from "react";
import browser from "../../browser";
import { Options } from "./useOptions";

export const useHost = (options: Pick<Options, "getTabInfo">) => {
  const [host, setHost] = useState<string>("");

  // get host
  useEffect(() => {
    if (!options.getTabInfo) return;
    if (host) return;

    browser.runtime.sendMessage({ type: "background:tabInfo" }).then(res => {
      if (res && res.host) setHost(res.host);
    });
  }, [options.getTabInfo]);

  return { host, setHost };
};
