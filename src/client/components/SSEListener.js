import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as effects from '../effects';

const StyledDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  font-weight: bold;
`;

// Server-sent Events component
function SSEListener() {
  const [messages, setMessage] = useState([]);

  useEffect(effects.sse.createMessagesEffect(setMessage), []);

  return <StyledDiv>SSE messages: {messages.join(', ')}</StyledDiv>;
}

export default SSEListener;
