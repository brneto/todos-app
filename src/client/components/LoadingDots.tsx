import React from 'react';
import { timer } from '../hooks';

type LoadingDotsProps = {
  readonly delay?: number;
  readonly length?: number;
  readonly children: string;
};

const LoadingDots: RF<LoadingDotsProps> = ({ delay = 300, length = 3, children }) => {
  const count = timer.useCounterUp(delay) % (length + 1); // Custom Hook

  return <span>{children + '.'.repeat(count)}&nbsp;</span>;
};

export default LoadingDots;
