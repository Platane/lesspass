import { useEffect, useState } from "react";
import { generatePassword } from "lesspass";

export const useGeneratedPassword = (host, login, masterPassword, params) => {
  const [generatedPassword, setGeneratedPassword] = useState<
    string | undefined
  >();

  useEffect(() => {
    if (login && host && masterPassword)
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
