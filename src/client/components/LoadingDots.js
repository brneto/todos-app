import React from 'react';
import PropTypes from 'prop-types';
import * as hooks from '../hooks';

function LoadingDots({ delay, length, children }) {
  const count = hooks.timer.useCounterUp(delay) % (length + 1); // Custom Hook

  return <span>{children + '.'.repeat(count)}&nbsp;</span>;
}
LoadingDots.defaultProps = {
  delay: 300,
  length: 3,
};
LoadingDots.propTypes = {
  delay: PropTypes.number,
  length: PropTypes.number,
  children: PropTypes.string.isRequired,
};

export default LoadingDots;
