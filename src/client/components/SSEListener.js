import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import effects from '../effects';

const StyledDiv = styled.div`
  text-align: center;
`;

// Server-sent Events component
function SSEListener() {
  const [messages, setMessage] = useState([]);

  useEffect(effects.sse.createMessagesEffect(setMessage), []);

  return <StyledDiv>SSE messages: {messages.join(', ')}</StyledDiv>;
}

export default SSEListener;
