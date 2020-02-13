import React from "react";
import styled from "@emotion/styled";
import { InputText } from "./InputText";

export const InputTextWithIcon = ({
  style,
  css,
  className,
  icon,
  ...props
}: any) => (
  <Container style={style} css={css} className={className}>
    <Icon>{icon}</Icon>
    <Input {...props} />
  </Container>
);

const Input = styled(InputText)`
  width: 100%;
  padding-left: 34px;
`;
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;
const Icon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  width: 34px;
  pointer-events: none;
`;
