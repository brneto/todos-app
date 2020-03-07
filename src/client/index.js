import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import * as state from './redux/store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Root {...state} />,
  document.getElementById('root')
);

// Learn more about service workers: http://bit.ly/CRA-PWA
process.env.NODE_ENV !== 'production'
  ? serviceWorker.unregister()
  : serviceWorker.register();
