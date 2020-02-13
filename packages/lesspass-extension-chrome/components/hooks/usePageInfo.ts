import { useEffect, useState } from "react";
import browser from "../../browser";

export const usePageInfo = () => {
  const [pageInfo, setPageInfo] = useState({
    canSubmit: false,
    haveLoginField: false
  });

  useEffect(() => {
    browser.runtime
      .sendMessage({ type: "content:pageInfo" })
      .then(x => x && setPageInfo(x));
  }, []);

  return pageInfo;
};
