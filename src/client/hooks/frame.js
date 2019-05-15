import { useState, useEffect } from 'react';

function useFrame(delay) {
  const [frame, setFrame] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(
        () => setFrame(prevState => ++prevState),
        delay
     );

    return () => clearInterval(intervalId);
  }, [delay]);

  return frame;
}

export { useFrame };
