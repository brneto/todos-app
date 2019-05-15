import { useState, useEffect } from 'react';

function useFrame(interval) {
  const [frame, setFrame] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(
      () => setFrame(prevState => ++prevState),
      interval
    );

    return () => clearInterval(intervalId);
  }, [interval]);

  return frame;
}

export { useFrame };
