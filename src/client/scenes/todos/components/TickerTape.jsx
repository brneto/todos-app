import React from 'react';
import PropTypes from 'prop-types';
import { css, keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import moment from 'moment';
import { sse } from './hooks';

const
  dynamicHeight = ({ open }) => open && css`
    height: 3em;
  `,
  rollLeft = keyframes`
    0% { left: 100%; }
    100% { left: -100%; }
  `,
  dynamicAnimation = ({ open }) => open && css`
    animation: ${rollLeft} 40s linear 4s infinite;
  `,
  Tape = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    ${dynamicHeight};
    transition: height 2s ease-out 1s;
    background: white;

    & > p:first-of-type {
      position: absolute;
      top: 50%;
      left: 100%;
      margin: 0;
      ${dynamicAnimation};
      transform: translateY(-50%);
      color: black;
      font-size: 1rem;
      font-weight: bold;
      white-space: nowrap;
    }
  `;

  const
    propTypes = {
      url: PropTypes.string.isRequired,
    };

// Server-sent Events component
function TickerTape({ url }) {
  const notices = sse.useNotices(url); // Custom Hook

  return (
    <Tape open={notices.length}>
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
TickerTape.propTypes = propTypes;

export default TickerTape;
