import React from "react";
import styled from "@emotion/styled";
import { Button } from "./Button";
import { useRouter } from "./hooks/useRouter";
import { Separator } from "./Separator";

export const Header = () => {
  const { goToOptions } = useRouter();

  return (
    <Container>
      <Logo alt="logo" src="/icons/logo.png" />

      <Separator />

      <IconButton onClick={goToOptions}>⚙️</IconButton>
    </Container>
  );
};

const Logo = styled.img`
  object-fit: contain;
  object-position: left center;
  height: 40px;
`;
const Container = styled.div`
  width: 100%;
  height: 60px;
  // background-color: #ccc;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
const IconButton = styled(Button)`
  width: 30px;
  height: 30px;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
