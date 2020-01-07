import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import moment from 'moment';
import * as hooks from '../hooks';
import LoadingDots from './LoadingDots';

// TODO: First replace by object notation
// TODO: https://www.styled-components.com/docs/advanced#style-objects
// TODO: Then experiment replace styled-components by Emotion
// TODO: https://emotion.sh/docs/introduction
// TODO: styled-components vs emotion
// TODO: https://github.com/jsjoeio/styled-components-vs-emotion/blob/master/README.md
const
  rollLeft = keyframes`
    0% { left: 100%; }
    100% { left: -100%; }
  `,
  rollNotice = css`
    animation: ${rollLeft} 40s linear 4s infinite;
  `,
  Tape = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: ${({ open }) => open && '3em'};
    transition: height 2s ease-out 1s;
    background: white;

    & > p:first-child {
      position: absolute;
      top: 50%;
      left: 100%;
      margin: 0;
      ${({ open }) => open && rollNotice};
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
  const notices = hooks.sse.useNotices(url); // Custom Hook

  return (
    <Tape open={notices.length}>
      <p>
        {notices
          .map(notice =>
            `${moment(notice.time).format('D/MM/YY H:mm:ss')} ${notice.text}`
          )
          .join(' | ')}
      </p>
      <LoadingDots>Testing</LoadingDots>
    </Tape>
  );
}

TickerTape.propTypes = propTypes;

export default TickerTape;
