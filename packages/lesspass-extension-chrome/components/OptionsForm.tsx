import React from "react";
import styled from "@emotion/styled";
import { useTranslate } from "./hooks/useTranslate";
import { Separator } from "./Separator";
import { Options } from "./hooks/useOptions";
import { CheckBox } from "./CheckBox";

type Props = {
  value: Options;
  onChange: (account: Options) => void;
};

export const OptionsForm = ({ value, onChange, ...props }: Props) => {
  const t = useTranslate();

  return (
    <Container {...props}>
      <BooleanOption name="getTabInfo" value={value} onChange={onChange}>
        Read the host from the current tab
      </BooleanOption>

      <BooleanOption name="getPageInfo" value={value} onChange={onChange}>
        Determine if the current page has login form
      </BooleanOption>

      <BooleanOption
        disabled={!value.getPageInfo}
        name="getLoginFields"
        value={value}
        onChange={onChange}
      >
        Read the login from the current page
      </BooleanOption>

      <Separator />

      <Label disabled={!value.getPageInfo}>
        <CheckBox_
          disabled={!value.getPageInfo}
          value={value["fillLoginFields"] !== "no"}
          onChange={v =>
            onChange({ ...value, ["fillLoginFields"]: v ? "submit" : "no" })
          }
        />
        Allow to fill the page fields login / password from the extension
      </Label>

      {value["fillLoginFields"] !== "no" && (
        <Label>
          <CheckBox_
            value={value["fillLoginFields"] === "auto"}
            onChange={v =>
              onChange({
                ...value,
                ["fillLoginFields"]: v ? "auto" : "submit"
              })
            }
          />
          Automatically fill the page fields
        </Label>
      )}

      <Separator />
      <BooleanOption
        name="saveMasterPassword"
        value={value}
        onChange={onChange}
      >
        Save the master password at extension runtime
      </BooleanOption>
    </Container>
  );
};

const BooleanOption = ({ name, value, children, disabled, onChange }) => (
  <Label disabled={disabled}>
    <CheckBox_
      disabled={disabled}
      value={value[name]}
      onChange={v => onChange({ ...value, [name]: v })}
    />
    {children}
  </Label>
);

const Label = styled.label`
  margin-bottom: 12px;
  display: block;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  opacity: ${props => (props.disabled ? 0.8 : 1)};
` as any;
const CheckBox_ = styled(CheckBox)`
  margin-right: 8px;
`;
const Container = styled.div``;
