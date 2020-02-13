import browser from "../../browser";
import { useEffect, useState } from "react";

export const useRouter = () => {
  const goToOptions = () =>
    browser.runtime.sendMessage({
      type: "background:optionsPage:open"
    });

  return { goToOptions };
};
