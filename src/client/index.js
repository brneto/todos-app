import React, { useState } from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import state from './redux/store';
import * as serviceWorker from './serviceWorker';


const evtSource = new EventSource('/api/sse');

const Evento = () => {
  const [state, setState] = useState('inicio');

  evtSource.addEventListener('messages', evt => {
    setState(evt.data);
  });

  return (
    <div>{state}</div>
  );
};

render(
  //<Root {...state} />,
  <Evento />,
  document.getElementById('root')
);

// Learn more about service workers: http://bit.ly/CRA-PWA
process.env.NODE_ENV !== 'production'
  ? serviceWorker.unregister()
  : serviceWorker.register();
