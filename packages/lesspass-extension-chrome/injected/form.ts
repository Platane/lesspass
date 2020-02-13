// find login related fields
// strategy: find a passport input and from that a sibling input=text
export const getLoginFields = () => {
  const password = document.querySelector('input[type="password"]');

  if (!password) return;

  const [login] = getSiblingInput(password, 5);

  if (login)
    return {
      password: password as HTMLInputElement,
      login: login as HTMLInputElement
    };
};

const getNAncestor = (el: Element, n: number) =>
  n <= 0 || !el || !el.parentElement
    ? el
    : getNAncestor(el.parentElement, n - 1);

const getSiblingInput = (el: Element, n = 1) => {
  if (n === 0) return [];

  const a = getNAncestor(el, n);

  return [
    ...getSiblingInput(el, n - 1),
    ...a.querySelectorAll("input[type=email]"),
    ...a.querySelectorAll("input[type=text]"),
    ...a.querySelectorAll("input[type='']")
  ];
};

export const getFormAncestor = (el: Element | null) =>
  !el || el.tagName === "FORM" ? el : getFormAncestor(el.parentElement);

const haveSignificativeDimension = (el: Element) => {
  const rect = el.getBoundingClientRect();

  return rect.width > 100 && rect.height > 10;
};
