import React, { useState, useEffect } from 'react';

function useSSE() {
  const [state, setState] = useState([]);

  useEffect(() => {
    const evtSource = new EventSource('/api/sse');
    const handleServerEvent = evt =>
      setState(prevState => [...prevState, evt.data]);

    evtSource.addEventListener('messages', handleServerEvent);
    return () => {
      evtSource.removeEventListener('messages', handleServerEvent);
      evtSource.close();
    };
  }, []);

  return state;
}

// Server-sent Events component
function SSEListener() {
  const messages = useSSE();
  return (<div>SSE messages: {messages.join(', ')}</div>);
}

export default SSEListener;
