import { useState, useEffect } from 'react';

function useFrame(timer) {
  const [frame, setFrame] = useState(1);

  useEffect(() => {
    const
      updateFrame = () => setFrame(prevState => ++prevState),
      intervalId = setInterval(updateFrame, timer),
      removeInterval = intervalId => () => clearInterval(intervalId);

    return removeInterval(intervalId);
  }, [timer]);

  return frame;
}

export { useFrame };
