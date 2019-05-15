import { useState, useEffect } from 'react';

function useCounterUp(delay, start = 1) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    const intervalId = setInterval(
      () => setCount(prevCount => ++prevCount),
      delay
    );

    return () => clearInterval(intervalId);
  }, [delay]);

  return count;
}

export { useCounterUp };
