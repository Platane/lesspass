import React from "react";
import styled from "@emotion/styled";
import { AccountForm } from "../AccountForm";
import { useAccount } from "../hooks/useAccount";
import { useGeneratedPassword } from "../hooks/useGeneratedPassword";
import { fillPassword, submitPassword } from "../hooks/useFillPassword";
import { Button } from "../Button";
import { Separator } from "../Separator";
import { usePageInfo } from "../hooks/usePageInfo";
import { useOptions } from "../hooks/useOptions";
import { useDebouncedEffect } from "../hooks/useDebouncedEffect";
import { InputText } from "../InputText";
import { useTranslate } from "../hooks/useTranslate";
import { useProfiles } from "../hooks/useProfiles";
import { defaultParams } from "../../types";
import { useMasterPassword } from "../hooks/useMasterPassword";
import { useHost } from "../hooks/useHost";
import { useCredentials } from "../hooks/useCredentials";

export const PopupMain = () => {
  const t = useTranslate();
  const { options } = useOptions();
  // const { host, setHost } = useHost(options);
  const { masterPassword, setMasterPassword } = useMasterPassword(options);
  const { profiles, addProfile } = useProfiles(options);

  const { host, login, setHost, setLogin } = useCredentials(options);

  const { account, setAccount } = useAccount(options);
  const generatedPassword = useGeneratedPassword(account);
  const { canSubmit, haveLoginField } = usePageInfo();

  // auto-fill
  useDebouncedEffect(
    () => {
      if (!haveLoginField || options.fillLoginFields !== "auto") return;

      fillPassword(
        account.login,
        account.masterPassword ? generatedPassword : undefined
      );
    },
    [account.login, generatedPassword, haveLoginField, options.fillLoginFields],
    500
  );

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log("---");
          submitPassword(account.login, generatedPassword);
        }}
      >
        <AccountForm
          host={host}
          login={login}
          masterPassword={masterPassword}
          onChangeHost={setHost}
          onChangeLogin={setLogin}
          onChangeMasterPassword={setMasterPassword}
        />

        <Separator />

        {canSubmit && options.fillLoginFields !== "no" && (
          <>
            <Button disabled={!generatedPassword} type="submit">
              Submit
            </Button>
            <Separator />
          </>
        )}
      </form>

      <Button
        disabled={!account.host && !account.login}
        onClick={() =>
          addProfile({
            host: account.host,
            login: account.login,
            params: defaultParams
          })
        }
      >
        Save profile
      </Button>

      <Separator />

      <InputResult
        visible={!!generatedPassword}
        value={generatedPassword}
        placeholder={t("Generated Password")}
        onFocus={e => {
          e.target.select();
          if (window.navigator.clipboard && generatedPassword)
            window.navigator.clipboard.writeText(generatedPassword);
        }}
        onChange={() => {}}
      />
    </>
  );
};

const InputResult = styled(InputText)`
  background-color: rgb(219, 221, 230);
`;
