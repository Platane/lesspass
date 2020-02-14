import React from "react";
import styled from "@emotion/styled";
import { useTranslate } from "./hooks/useTranslate";
import { InputTextWithIcon } from "./InputTextWithIcon";
import { Separator } from "./Separator";

export const AccountForm = ({
  login,
  host,
  masterPassword,
  onChangeLogin,
  onChangeHost,
  onChangeMasterPassword,
  ...props
}) => {
  const t = useTranslate();

  return (
    <Container {...props}>
      <Input
        icon="🌍"
        value={host}
        onChange={onChangeHost}
        placeholder={t("Site")}
      />
      <Separator />
      <Input
        icon="🧔"
        value={login}
        onChange={onChangeLogin}
        placeholder={t("Login")}
      />
      <Separator />
      <Input
        icon="🔑"
        type="password"
        value={masterPassword}
        onChange={onChangeMasterPassword}
        placeholder={t("Master Password")}
      />
    </Container>
  );
};

const Container = styled.div``;
const Input = styled(InputTextWithIcon)``;
