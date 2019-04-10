import React, { useState, useEffect } from 'react';

function useWindowsWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  });

  return width;
}

function MyResponsiveComponent() {
  const width = useWindowsWidth(); // My custom Hook
  return (<p>Window width is {width}.</p>);
}

export default MyResponsiveComponent;
