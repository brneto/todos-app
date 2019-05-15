import { useState, useEffect } from 'react';

function useCounterUp(delay, initial = 1) {
  const [count, setCount] = useState(initial);

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
