import { useState, useEffect } from 'react';

function useFrame(interval) {
  const [frame, setFrame] = useState(1);

  useEffect(() => {
    const
      updateFrame = () => setFrame(prevState => ++prevState),
      intervalId = setInterval(updateFrame, interval),
      removeInterval = intervalId => () => clearInterval(intervalId);

    return removeInterval(intervalId);
  }, [interval]);

  return frame;
}

export { useFrame };
