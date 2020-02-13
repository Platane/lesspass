import React from "react";
import styled from "@emotion/styled";
import { GlobalStyle } from "./GlobalCss";
import { Header } from "./Header";

export const PopupLayout = ({ children, ...props }) => {
  return (
    <>
      <GlobalStyle />
      <Container {...props}>
        <Header />
        <Content>{children}</Content>
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
  width: 400px;
`;
