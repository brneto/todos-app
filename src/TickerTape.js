import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import moment from 'moment';

const rollLeft = keyframes`
  0% { left: 100%; }
  100% { left: -100%; }
`;
const rollNotice = css`
  animation: ${rollLeft} 40s linear 4s infinite;
`;
const Tape = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  background: var(--color-unknown);
  margin: auto;
  width: 100%;
  height: ${({ open }) => (open ? '3em' : '0')};
  transition: height 2s ease-out 1s;

  & > p {
    ${({ open }) => open && rollNotice};
    position: absolute;
    left: 100%;
    line-height: 2em;
    font-size: 14pt;
    font-weight: bold;
    white-space: nowrap;
    color: white;
    white-space: nowrap;
  }
`;

function TickerTape() {
  const [notices, setNotice] = useState([]);
  useEffect(() => {
    const eventSource = new EventSource('api/sse');
    const eventHandler = {
      add: [
        'addnotice',
        event => setNotice(
          prevState => [...prevState, JSON.parse(event.data)]
        ),
        false,
      ],
      update: [
        'updnotice',
        event => setNotice(prevState => prevState.map(
          notice => {
            const eventData = JSON.parse(event.data);
            return notice.id === eventData.id ? eventData : notice;
          }
        )),
        false,
      ],
      delete: [
        'delnotice',
        event => setNotice(prevState => prevState.filter(
          notice => notice.id !== JSON.parse(event.data).id
        )),
        false,
      ],
      clear: ['clanotice', () => setNotice([]), false],
    };

    eventSource.addEventListener(...eventHandler.add);
    eventSource.addEventListener(...eventHandler.update);
    eventSource.addEventListener(...eventHandler.delete);
    eventSource.addEventListener(...eventHandler.clear);

    return () => {
      eventSource.removeEventListener(...eventHandler.add);
      eventSource.removeEventListener(...eventHandler.update);
      eventSource.removeEventListener(...eventHandler.delete);
      eventSource.removeEventListener(...eventHandler.clear);

      eventSource.close();
    };
  }, []);
  const hasNotice = Boolean(notices.length);

  return (
    <Tape open={hasNotice}>
      <p>{
        notices.map(notice =>
          `${moment(notice.time).format('D/MM/YY H:mm:ss')} ${notice.text}`
        ).join(' | ')
      }</p>
    </Tape>
  );
}

export default TickerTape;
