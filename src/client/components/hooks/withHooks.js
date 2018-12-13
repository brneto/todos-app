import React, { useState, useEffect } from 'react';

function useWindowsWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = () => setWidth(window.innerWidth);
  const cleanup = () => window.removeEventListener('resize', handleResize);

  useEffect(() =>
    window.addEventListener('resize', handleResize) ||
    cleanup,
    [width]
  );

  return width;
}

function WithHooksComponent() {
  const width = useWindowsWidth(); // My custom Hook
  return <h1>Window width is {width}.</h1>;
}

export default WithHooksComponent;
