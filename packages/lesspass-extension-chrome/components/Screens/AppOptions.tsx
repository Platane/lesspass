import React from "react";
import styled from "@emotion/styled";
import { useOptions } from "../hooks/useOptions";
import { OptionsForm } from "../OptionsForm";

export const AppOptions = () => {
  const { options, setOptions } = useOptions();

  return (
    <>
      <h1>Options</h1>

      <OptionsForm value={options} onChange={setOptions} />
    </>
  );
};
