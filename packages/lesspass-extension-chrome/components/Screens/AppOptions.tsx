import React from "react";
import styled from "@emotion/styled";
import { GlobalStyle } from "../GlobalCss";
import { Header } from "../Header";
import { useOptions } from "../hooks/useOptions";
import { OptionsForm } from "../OptionsForm";

export const AppOptions = () => {
  const { options, setOptions } = useOptions();

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header />
        <Content>
          <OptionsForm value={options} onChange={setOptions} />
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
`;
