import React from "react";
import styled from "@emotion/styled";
import { useTranslate } from "./hooks/useTranslate";
import { Separator } from "./Separator";
import { Params } from "../types";
import { CheckBox } from "./CheckBox";
import { InputText } from "./InputText";

type Props = {
  value: Params;
  onChange: (p: Params) => void;
};

export const ParamsForm = ({ value, onChange, ...props }: Props) => {
  const t = useTranslate();

  return (
    <Container {...props}>
      <Row>
        <Label>
          <CheckBox
            value={value.lowercase}
            onChange={lowercase => onChange({ ...value, lowercase })}
          />
          a-z
        </Label>

        <Label>
          <CheckBox
            value={value.uppercase}
            onChange={uppercase => onChange({ ...value, uppercase })}
          />
          A-Z
        </Label>

        <Label>
          <CheckBox
            value={value.numbers}
            onChange={numbers => onChange({ ...value, numbers })}
          />
          0-9
        </Label>

        <Label>
          <CheckBox
            value={value.symbols}
            onChange={symbols => onChange({ ...value, symbols })}
          />
          %!@
        </Label>
      </Row>
      <Separator />
      <Row>
        <Label>
          <InputText
            type="number"
            value={value.counter}
            onChange={counter => onChange({ ...value, counter: +counter })}
            style={{ width: "80px" }}
          />
          counter
        </Label>
      </Row>
      <Separator />
      <Row>
        <Label>
          <InputText
            type="number"
            value={value.length}
            onChange={length => onChange({ ...value, length: +length })}
            style={{ width: "80px" }}
          />
          length
        </Label>
      </Row>
    </Container>
  );
};

const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Container = styled.div``;
