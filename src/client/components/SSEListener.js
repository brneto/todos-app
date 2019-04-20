import React, { useState, useEffect } from 'react';
import effects from '../effects';

function useSSE() {
  const [state, setState] = useState([]);
  useEffect(effects.sse.createMessagesEffect(setState), []);

  return state;
}

// Server-sent Events component
function SSEListener() {
  const messages = useSSE();

  return <div>SSE messages: {messages.join(', ')}</div>;
}

export default SSEListener;
