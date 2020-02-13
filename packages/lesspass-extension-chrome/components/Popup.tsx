import React, { useEffect } from "react";
import { AccountForm } from "./AccountForm";
import { GlobalStyle } from "./GlobalCss";
import { useAccount } from "./hooks/useAccount";
import { useGeneratedPassword } from "./hooks/useGeneratedPassword";
import { fillPassword, submitPassword } from "./hooks/useFillPassword";
import { Button } from "./Button";
import { Separator } from "./Separator";
import { Header } from "./Header";
import styled from "@emotion/styled";

export const Popup = () => {
  const { account, setAccount } = useAccount();
  const generatedPassword = useGeneratedPassword(account);

  const { canSubmit, haveLoginField } = account as any;

  useEffect(() => {
    if (haveLoginField) fillPassword(account.login, generatedPassword);
  }, [account.login, generatedPassword, haveLoginField]);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header />
        <Content>
          <form
            onSubmit={e => {
              e.preventDefault();
              console.log("---");
              submitPassword(account.login, generatedPassword);
            }}
          >
            <AccountForm value={account} onChange={setAccount} />

            <Separator />

            {canSubmit && (
              <Button disabled={!generatedPassword} type="submit">
                Submit
              </Button>
            )}
          </form>

          <Separator />

          <pre>
            {JSON.stringify({ ...account, generatedPassword }, null, 2)}
          </pre>
        </Content>
      </Container>
    </>
  );
};

const Content = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;
