import { useEffect, useState } from "react";
import { generatePassword } from "lesspass";

export const useGeneratedPassword = account => {
  const [generatedPassword, setGeneratedPassword] = useState<
    string | undefined
  >();

  useEffect(() => {
    if (account.login && account.host && account.masterPassword)
      generatePassword(
        //
        account.host,
        account.login,
        account.masterPassword,
        {
          ...account.profile,
          counter: account.i
        }
      ).then(setGeneratedPassword);
    else setGeneratedPassword(undefined);
  }, [account]);

  return generatedPassword;
};
