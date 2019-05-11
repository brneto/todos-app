import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import moment from 'moment';
import * as hooks from '../hooks';

const rollLeft = keyframes`
  0% { left: 100%; }
  100% { left: -100%; }
`;
const rollNotice = css`
  animation: ${rollLeft} 40s linear 4s infinite;
`;
const Tape = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${({ open }) => (open ? '3em' : '0')};
  margin: auto;
  transition: height 2s ease-out 1s;
  background: var(--color-unknown);

  & > p {
    ${({ open }) => open && rollNotice};
    position: absolute;
    left: 100%;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    line-height: 2em;
    white-space: nowrap;
  }
`;

// Server-sent Events component
function TickerTape({ eventSourceUrl }) {
  const notices = hooks.useNotices(eventSourceUrl), // My custom Hook
    hasNotice = Boolean(notices.length);

  return (
    <Tape open={hasNotice}>
      <p>
        {notices
          .map(notice =>
            `${moment(notice.time).format('D/MM/YY H:mm:ss')} ${notice.text}`
          )
          .join(' | ')}
      </p>
    </Tape>
  );
}
TickerTape.propTypes = {
  eventSourceUrl: PropTypes.string.isRequired,
};

export default TickerTape;
