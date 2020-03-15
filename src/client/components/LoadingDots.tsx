import React from 'react';
import * as hooks from '../hooks';

type loadingDotsProps = {
  delay?: number;
  length?: number;
}

const LoadingDots: React.FC<loadingDotsProps> = ({ delay = 300, length = 3, children }) => {
  const count = hooks.timer.useCounterUp(delay) % (length + 1); // Custom Hook

  return <span>{children as string + '.'.repeat(count)}&nbsp;</span>;
};

export default LoadingDots;
