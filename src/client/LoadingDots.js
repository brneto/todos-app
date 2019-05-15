import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function LoadingDots(props) {
  const [frame, setFrame] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(
      () => setFrame(prevState => ++prevState),
      props.interval
    );

    return () => clearInterval(intervalId);
  }, [props.interval]);

  let loadingDots = frame % (props.dots + 1);
  let text = '';
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
