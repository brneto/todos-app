import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as state from './redux/store';
import * as serviceWorker from './serviceWorker';

// https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1
ReactDOM.render(
  <App {...state} />,
  document.getElementById('root')
);

// Learn more about service workers: http://bit.ly/CRA-PWA
process.env.NODE_ENV !== 'production'
  ? serviceWorker.unregister()
  : serviceWorker.register();
