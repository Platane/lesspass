import React from "react";
import { Global, css } from "@emotion/core";

export const GlobalStyle = () => (
  <Global
    styles={css`
      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      html {
        background-color: #eee;
      }

      body {
        margin: 0;
        font-family: helvetica, Arial, sans-serif;
      }
      input {
        font-family: helvetica, Arial, sans-serif;
      }
    `}
  />
);
