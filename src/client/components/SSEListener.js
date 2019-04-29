import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as effects from '../effects';

// const StyledDiv = styled.div`
//   position: fixed;
//   left: 0;
//   bottom: 0;
//   background: var(--color-unknown);
//   margin: auto;
//   width: 100%;
//   height: ${({ show }) => show ? '3em' : '0'};
//   transition: height 2s ease-out 1s;
// `;

// const breakNews =  keyframes`
//   0% { left: 100%; }
// 	100% { left: -100%; }
// `;
// const StyledNews = styled.div`
//   animation: ${breakNews} 40s linear 4s infinite;
// 	position: absolute;
//   left: 100%;
//   line-height: 2em;
//   font-size: 14pt;
//   font-weight: bold;
//   white-space: nowrap;
// 	color: white;
// 	white-space: nowrap;
// `;

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
