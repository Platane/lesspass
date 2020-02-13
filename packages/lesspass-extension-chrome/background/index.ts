import { parse as parseUrl } from "url";
import browser from "../browser";
import { Options, defaultOptions } from "../components/hooks/useOptions";

export const init = () => {
  let masterPassword: string;

  browser.runtime.onMessage.addListener(async (message, sender) => {
    try {
      // read the tab
      const tab = sender.tab || (await getTab(sender));
      const tabId = tab && tab.id;

      // read options object
      const options = {
        ...defaultOptions,
        ...(await browser.storage.sync.get("options")).options
      } as Options;

      switch (message && message.type) {
        case "background:optionsPage:open": {
          const url = `chrome-extension://${browser.runtime.id}/app.html#options`;

          await browser.tabs.create({ url, active: true });

          return;
        }
        case "background:tabInfo": {
          if (!options.getTabInfo) return;

          const url = tab && tab.url;

          if (!url) return { tabId, host: undefined };

          const { host } = parseUrl(url);
          const simplifiedHost = host && host.replace(/^www\./, "");

          return { tabId, host: simplifiedHost };
        }
        case "background:loginFields:changed": {
          console.log(tab, message);

          return;
        }

        case "background:masterPassword:get": {
          if (!options.saveMasterPassword) return;
          return { masterPassword };
        }
        case "background:masterPassword:set": {
          if (!options.saveMasterPassword) return;
          masterPassword = message.masterPassword;
          return;
        }
        case "content:loginFields:get":
        case "content:loginFields:submit":
        case "content:loginFields:fill":
        case "content:loginFields:watch":
        case "content:pageInfo": {
          if (
            (message.type === "content:loginFields:watch" &&
              !options.getLoginFields) ||
            (message.type === "content:loginFields:get" &&
              !options.getLoginFields) ||
            (message.type === "content:loginFields:fill" &&
              options.fillLoginFields === "no") ||
            (message.type === "content:loginFields:submit" &&
              options.fillLoginFields === "no") ||
            (message.type === "content:pageInfo" && !options.getPageInfo)
          )
            return;

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
