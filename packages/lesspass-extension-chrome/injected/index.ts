import browser from "../browser";
import { getLoginFields, getFormAncestor } from "./form";

const documentReady =
  document.readyState === "complete"
    ? Promise.resolve()
    : new Promise(r => window.addEventListener("load", r));

const init = () => {
  browser.runtime.onMessage.addListener(async message => {
    try {
      switch (message && message.type) {
        case "content:pageInfo": {
          await documentReady;
          const m = getLoginFields();
          return {
            haveLoginField: !!m,
            canSubmit: !!(m && getFormAncestor(m.login))
          };
        }

        case "content:loginFields:get": {
          await documentReady;
          const m = getLoginFields();
          return m && { login: m.login.value };
        }

        case "content:loginFields:fill": {
          await documentReady;
          const m = getLoginFields();
          if (m) {
            m.login.value = message.login;
            m.password.value = message.password;
          }
          return;
        }

        case "content:loginFields:submit": {
          await documentReady;
          const m = getLoginFields();
          if (m) {
            m.login.value = message.login;
            m.password.value = message.password;

            const f = getFormAncestor(m.login);

            if (f) f.submit();
          }
          return;
        }

        case "content:loginFields:watch": {
          await documentReady;
          const m = getLoginFields();
          if (m) {
            m.login.removeEventListener("input", onLoginFieldsChange);
            m.password.removeEventListener("input", onLoginFieldsChange);

            m.login.addEventListener("input", onLoginFieldsChange);
            m.password.addEventListener("input", onLoginFieldsChange);
          }
        }

        case "content:ping":
          return Date.now();

        default:
          return;
      }
    } catch (err) {
      console.error(err);
    }
  });

  const onLoginFieldsChange = () => {
    const m = getLoginFields();
    browser.runtime.sendMessage({
      type: "background:loginFields:changed",
      login: m && m.login.value
    });
  };
};

// init once
if (!(window as any).__lesspass_injected) {
  (window as any).__lesspass_injected = true;
  init();
}
