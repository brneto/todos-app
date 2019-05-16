import { useState, useEffect } from 'react';

function useCounterUp(delay, initial = 1) {
  const [count, setCount] = useState(initial);

  useEffect(() => {
    const interval = setInterval(
      () => setCount(
        prevCount => prevCount < Number.MAX_SAFE_INTEGER ? ++prevCount : initial
      ),
      delay
    );

    return () => clearInterval(interval);
  }, [delay, initial]);

  return count;
}

export { useCounterUp };
