import React from 'react';
import PropTypes from 'prop-types';
import * as hooks from '../hooks';

function LoadingDots(props) {
  const frame = hooks.useFrame(props.interval);
  let
    loadingDots = frame % (props.dots + 1),
    text = '';

  while (loadingDots > 0) {
    text += '.';
    loadingDots--;
  }

  return <span {...props}>{text}&nbsp;</span>;
}
LoadingDots.defaultProps = {
  interval: 300,
  dots: 3,
};
LoadingDots.propTypes = {
  interval: PropTypes.number,
  dots: PropTypes.number,
};

export default LoadingDots;
