import React from "react";
import styled from "@emotion/styled";
import { useTranslate } from "./hooks/useTranslate";
import { InputTextWithIcon } from "./InputTextWithIcon";
import { Separator } from "./Separator";
import { Account } from "./hooks/useAccount";

type Props = {
  value: Account;
  onChange: (account: Account) => void;
};

export const AccountForm = ({ value, onChange, ...props }: Props) => {
  const t = useTranslate();

  return (
    <Container {...props}>
      <Input
        icon="🌍"
        value={value.host}
        onChange={host => onChange({ ...value, host })}
        placeholder={t("Site")}
      />
      <Separator />
      <Input
        icon="🧔"
        value={value.login}
        onChange={login => onChange({ ...value, login })}
        placeholder={t("Login")}
      />
      <Separator />
      <Input
        icon="🔑"
        type="password"
        value={value.masterPassword}
        onChange={masterPassword => onChange({ ...value, masterPassword })}
        placeholder={t("Master Password")}
      />
    </Container>
  );
};

const Container = styled.div``;
const Input = styled(InputTextWithIcon)``;
