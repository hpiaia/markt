import { useEffect, useState } from 'react';

export const useIsMounted = () => {
  const [isMounted, setIsMouted] = useState(false);

  useEffect(() => {
    setIsMouted(true);

    return () => setIsMouted(false);
  }, []);

  return isMounted;
};
