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

export const PopupMain = () => {
  const t = useTranslate();
  const { options } = useOptions();
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
        <AccountForm value={account} onChange={setAccount} />

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
