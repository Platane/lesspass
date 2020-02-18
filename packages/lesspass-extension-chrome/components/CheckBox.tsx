import React from "react";
import styled from "@emotion/styled";

export const CheckBox = ({ value, onChange, ...props }) => (
  <Input
    {...props}
    type="checkbox"
    checked={!!value}
    onChange={e => onChange(e.target.checked)}
  />
);

const Input = styled.input`
  width: 18px;
  height: 18px;
  margin: 0;
`;
