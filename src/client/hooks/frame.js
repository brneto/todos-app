import { useState, useEffect } from 'react';

function useFrame(delay) {
  const [frame, setFrame] = useState(1);

  useEffect(() => {
    const
      updateFrame = () => setFrame(prevState => ++prevState),
      intervalId = setInterval(updateFrame, delay),
      removeInterval = intervalId => () => clearInterval(intervalId);

    return removeInterval(intervalId);
  }, [delay]);

  return frame;
}

export { useFrame };
