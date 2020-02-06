import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import * as state from './redux/store';
import * as serviceWorker from './serviceWorker';

console.info('berchris', ReactDOM.createRoot);
// ReactDOM.render(
//   <Root {...state} />,
//   document.getElementById('root')
// );

ReactDOM.createRoot(
  document.getElementById('root')
).render(<Root {...state} />);

// Learn more about service workers: http://bit.ly/CRA-PWA
process.env.NODE_ENV !== 'production'
  ? serviceWorker.unregister()
  : serviceWorker.register();
