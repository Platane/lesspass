import React, { useEffect } from "react";
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
import { useMasterPassword } from "../hooks/useMasterPassword";
import { ParamsForm } from "../ParamsForm";

export const PopupMain = () => {
  const t = useTranslate();
  const { options, inited: optionsInited } = useOptions();
  const { masterPassword, setMasterPassword } = useMasterPassword(options);
  const { profiles, addProfile } = useProfiles(options);
  const { account, setAccount, touched } = useAccount(
    optionsInited ? options : null
  );

  useEffect(() => {
    if (touched) return;

    const p = profiles.find(
      x =>
        x.host === account.host && (!account.login || account.login === x.login)
    );

    if (p) setAccount(p);
  }, [profiles, account, touched]);

  const generatedPassword = useGeneratedPassword(
    account.host,
    account.login,
    masterPassword,
    account.params
  );
  const { canSubmit, haveLoginField } = usePageInfo();

  // auto-fill
  useDebouncedEffect(
    () => {
      if (!haveLoginField || options.fillLoginFields !== "auto") return;

      fillPassword(
        account.login,
        masterPassword ? generatedPassword : undefined
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
          submitPassword(account.login, generatedPassword);
        }}
      >
        <AccountForm
          host={account.host}
          login={account.login}
          masterPassword={masterPassword}
          onChangeHost={host => setAccount({ host })}
          onChangeLogin={login => setAccount({ login })}
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
            params: account.params
          })
        }
      >
        Save profile
      </Button>

      <Separator />

      <ParamsForm
        value={account.params}
        onChange={params => setAccount({ params })}
      />

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
