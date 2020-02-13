import { parse as parseUrl } from "url";
import browser from "../browser";

export const init = () => {
  browser.runtime.onMessage.addListener(async (message, sender) => {
    try {
      console.log(message);

      const tab = sender.tab || (await getTab(sender));
      const tabId = tab && tab.id;

      switch (message && message.type) {
        case "background:tabInfo": {
          const url = tab && tab.url;

          if (!url) return { tabId, host: undefined };

          const h = parseUrl(url).host;
          const host = h && h.replace(/^www\./, "");

          return { tabId, host };
        }
        case "background:loginFields:changed": {
          console.log(tab, message);

          return;
        }

        case "content:loginFields:get":
        case "content:loginFields:submit":
        case "content:loginFields:fill":
        case "content:loginFields:watch":
        case "content:pageInfo": {
          if (!tabId) return;

          await browser.tabs.executeScript(tabId, {
            file: "/injected.js",
            runAt: "document_idle"
          });

          return await browser.tabs.sendMessage(tabId, message);
        }

        case "background:ping":
          return Date.now();

        default:
          return;
      }
    } catch (err) {
      console.error(err);
    }
  });
};

const getTab = (r): Promise<browser.tabs.Tab> =>
  new Promise(r =>
    // @ts-ignore
    browser.tabs.getSelected(r)
  );

init();
