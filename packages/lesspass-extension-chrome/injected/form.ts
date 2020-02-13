// find login related fields
export const getLoginFields = () => {
  // find a password field
  const password = document.querySelector('input[type="password"]');

  if (!password) return;

  // find the closest input text sibling
  const [login] = getSiblingInput(password, 8);

  if (login)
    return {
      password: password as HTMLInputElement,
      login: login as HTMLInputElement
    };
};

// return the n-th ancestor
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

// return the closest form ancestor ( if any )
export const getFormAncestor = (el: Element | null) =>
  !el || el.tagName === "FORM" ? el : getFormAncestor(el.parentElement);
