import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500");
  @import url("https://fonts.googleapis.com/icon?family=Material+Icons");

  @media (min-width: 899px) {
    width: auto;
    padding-left: 300px;
  }

  /* :root pseudo-class always stands to html element in HTML. */
  :root {
    font-size: ${props => props.fontSize};
  }

  :focus {
    outline: 0;
  }

  body {
    min-width: 230px;
    max-width: 550px;
    margin: 0 auto;
    padding: 0;
    background: ${props => props.theme.background};
    color: ${props => props.theme.color};
    font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 300;
    line-height: 1.4em;
  }
`;
GlobalStyle.defaultProps = {
  fontSize: 'unset'
};

const main = {
  background: '#f5f5f5',
  color: '#4d4d4d',
};

export { GlobalStyle as default, main };
