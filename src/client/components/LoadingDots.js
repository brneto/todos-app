import React from 'react';
import PropTypes from 'prop-types';
import * as hooks from '../hooks';

function LoadingDots({ interval, dots, children }) {
  let
    dotFrame = hooks.useFrame(interval) % (dots + 1),
    dotString = '';

  while (dotFrame > 0) {
    dotString += '.';
    dotFrame--;
  }

  return <span>{children + dotString}&nbsp;</span>;
}
LoadingDots.defaultProps = {
  interval: 300,
  dots: 3,
};
LoadingDots.propTypes = {
  interval: PropTypes.number,
  dots: PropTypes.number,
  children: PropTypes.string.isRequired,
};

export default LoadingDots;
