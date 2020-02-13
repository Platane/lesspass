import React from "react";
import { Global, css } from "@emotion/core";

export const GlobalStyle = () => (
  <Global
    styles={css`
      *,
      *:before,
      *:after {
        box-sizing: border-box;
      }

      body {
        background-color: #f0f0f0;
        margin: 0;
      }

      body,
      button,
      input {
        font-family: helvetica, Arial, sans-serif;
        font-size: 16px;
      }
    `}
  />
);
