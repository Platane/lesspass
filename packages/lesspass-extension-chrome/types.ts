export type Profile = {
  login: string;
  host: string;
  params: Params;
};

export type Params = {
  lowercase: boolean;
  uppercase: boolean;
  symbols: boolean;
  numbers: boolean;
  length: number;

  counter: number;
};

export const paramsEquals = (a: Params, b: Params) =>
  a.lowercase === b.lowercase &&
  a.uppercase === b.uppercase &&
  a.length === b.length &&
  a.symbols === b.symbols &&
  a.numbers === b.numbers &&
  a.counter === b.counter;

export const profileEquals = (a: Profile, b: Profile) =>
  a.login === b.login && a.host === b.host && paramsEquals(a.params, b.params);

export type Account = {
  host: string;
  login: string;
  params: Params;
};

export const defaultParams: Params = {
  lowercase: true,
  uppercase: true,
  symbols: true,
  numbers: true,
  length: 16,

  counter: 0
};
