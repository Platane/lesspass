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

  i: number;
};

export const paramsEquals = (a: Params, b: Params) =>
  a.lowercase === b.lowercase &&
  a.uppercase === b.uppercase &&
  a.length === b.length &&
  a.symbols === b.symbols &&
  a.numbers === b.numbers &&
  a.i === b.i;

export const profileEquals = (a: Profile, b: Profile) =>
  a.login === b.login && a.host === b.host && paramsEquals(a.params, b.params);

export type Account = {
  host: string;
  login: string;
  masterPassword: string;
  i: number;
  profile: Profile;
};

export const defaultParams: Params = {
  lowercase: true,
  uppercase: true,
  symbols: true,
  numbers: true,
  length: 16,

  i: 0
};
