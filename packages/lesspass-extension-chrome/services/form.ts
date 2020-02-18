// find login related fields
export const getLoginFields = () => {
  // find a password field
  const [password] = Array.from(
    document.querySelectorAll("input[type=password]")
  ).sort((a: any, b: any) => looksLikePassword(b) - looksLikePassword(a));

  if (!password) return;

  // find the closest input text sibling
  const [login] = getBeforeInputSiblings(password, 8).sort(
    (a, b) => looksLikeLogin(b) - looksLikeLogin(a)
  );

  if (login)
    return {
      password: password as HTMLInputElement,
      login: login as HTMLInputElement
    };
};

const looksLikePassword = (el: HTMLInputElement) => {
  const type = el.type;
  const id = el.id || "";
  const name = el.name || "";
  const className = el.className || "";

  const k = type === "password" ? 10000 : 1;

  const keywords = ["password"];

  if (keywords.some(k => id === k)) return 1000 * k;

  if (keywords.some(k => name === k)) return 1000 * k;

  if (keywords.some(k => id.includes(k))) return 100 * k;

  if (keywords.some(k => name.includes(k))) return 100 * k;

  if (keywords.some(k => className.includes(k))) return 10 * k;

  return k;
};

const looksLikeLogin = (el: HTMLInputElement) => {
  const id = el.id || "";
  const name = el.name || "";
  const className = el.className || "";

  const keywords = ["login", "email"];

  if (keywords.some(k => id === k)) return 1000;

  if (keywords.some(k => name === k)) return 1000;

  if (keywords.some(k => id.includes(k))) return 100;

  if (keywords.some(k => name.includes(k))) return 100;

  if (keywords.some(k => className.includes(k))) return 10;

  return 0;
};

// get the sibling input before the element
const getBeforeInputSiblings = (el: Element, n = 0) => {
  const parent = el.parentElement;

  if (!parent || n <= 0) return [];

  const children = Array.from(parent.children);

  const i = children.indexOf(el);

  return [
    ...children
      .slice(0, i)
      .reverse()
      .map(el => [el, ...Array.from(el.querySelectorAll("input"))])
      .flat()
      .filter(
        el =>
          el.tagName === "INPUT" &&
          ["text", "email"].includes(el.getAttribute("type") || "")
      ),
    ...getBeforeInputSiblings(parent, n - 1)
  ];
};

// return the closest form ancestor ( if any )
export const getFormAncestor = (el: Element | null) =>
  !el || el.tagName === "FORM" ? el : getFormAncestor(el.parentElement);
