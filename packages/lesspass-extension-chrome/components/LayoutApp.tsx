import React from "react";
import styled from "@emotion/styled";
import { GlobalStyle } from "./GlobalCss";
import { Header } from "./Header";

export const LayoutApp = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Container>
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
`;
