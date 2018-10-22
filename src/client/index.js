import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import Root from './components/Root';
import state from './redux/store';
import GlobalStyle, * as themes from './libs/style';
import * as serviceWorker from './serviceWorker';

render(
  <ThemeProvider theme={themes.main}>
    <>
      <Root {...state} />
      <GlobalStyle />
    </>
  </ThemeProvider>,
  document.getElementById('root')
);

// Learn more about service workers: http://bit.ly/CRA-PWA
process.env.NODE_ENV !== 'production'
  ? serviceWorker.unregister()
  : serviceWorker.register();
