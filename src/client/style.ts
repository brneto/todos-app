import { css } from '@emotion/core';
import { SerializedStyles } from '@emotion/serialize';

type Theme = {
  background: string;
  color: string;
  fontSize?: string;
}

const globalStyle = (theme: Theme): SerializedStyles => css`
  @import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500");
  @import url("https://fonts.googleapis.com/icon?family=Material+Icons");

  @media (min-width: 899px) {
    width: auto;
    padding-left: 300px;
  }

  /* :root pseudo-class always stands to html element in HTML. */
  :root {
    font-size: ${theme.fontSize ?? 'unset'};
  }

  :focus {
    outline: 0;
  }

  body {
    min-width: 230px;
    max-width: 550px;
    margin: 0 auto;
    padding: 0;
    background: ${theme.background};
    color: ${theme.color};
    font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 300;
    line-height: 1.4em;
  }
`;

const main: Theme = {
  background: '#f5f5f5',
  color: '#4d4d4d',
};

export { globalStyle as default, main };
