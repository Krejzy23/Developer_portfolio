import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce'; 

const useWindowSize = () => {
  const isClient = typeof window === 'object';

  const getSize = () => ({
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined,
  });

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) return;

    const handleResize = debounce(() => {
      setWindowSize(getSize());
    }, 200); // Debounce na 200ms

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]);

  return windowSize;
};

export default useWindowSize;