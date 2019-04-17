import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import state from './redux/store';
import * as serviceWorker from './serviceWorker';
//import SSEListener from './components/SSEListener';

// render(
//   <SSEListener />,
//   document.getElementById('root')
// );

render(
  <Root {...state} />,
  document.getElementById('root')
);

// Learn more about service workers: http://bit.ly/CRA-PWA
process.env.NODE_ENV !== 'production'
  ? serviceWorker.unregister()
  : serviceWorker.register();
