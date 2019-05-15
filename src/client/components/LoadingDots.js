import React from 'react';
import PropTypes from 'prop-types';
import * as hooks from '../hooks';

function LoadingDots({ delay, dots, children }) {
  let
    dotFrame = hooks.useFrame(delay) % (dots + 1),
    dotString = '';

  while (dotFrame > 0) {
    dotString += '.';
    dotFrame--;
  }

  return <span>{children + dotString}&nbsp;</span>;
}
LoadingDots.defaultProps = {
  delay: 300,
  dots: 3,
};
LoadingDots.propTypes = {
  delay: PropTypes.number,
  dots: PropTypes.number,
  children: PropTypes.string.isRequired,
};

export default LoadingDots;
