import React from "react";
import styled from "@emotion/styled";

export const InputText = ({ value, onChange, ...props }) => (
  <Input
    type="text"
    {...props}
    value={value === undefined || value === null ? "" : value}
    onChange={e => onChange(e.target.value)}
  />
);

const Input = styled.input`
  padding: 12px;
  border-radius: 0;
  border: none;
  background-color: #fff;
`;
