import { useEffect, useState } from "react";
import { generatePassword } from "lesspass";
import { Params } from "../../types";

export const useGeneratedPassword = (
  host,
  login,
  masterPassword,
  params: Params
) => {
  const [generatedPassword, setGeneratedPassword] = useState<
    string | undefined
  >();

  useEffect(() => {
    if (
      login &&
      host &&
      masterPassword &&
      (params.lowercase || params.numbers || params.symbols || params.uppercase)
    )
      generatePassword(
        //
        host,
        login,
        masterPassword,
        params
      ).then(setGeneratedPassword);
    else setGeneratedPassword(undefined);
  }, [host, login, masterPassword, params]);

  return generatedPassword;
};
