import { useEffect } from 'react';

export default function usePressKey(
  key: string | 'Enter' | 'Escape',
  callback: () => void,
) {
  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === key) {
        callback();
      }
    };

    window.addEventListener('keypress', handleEnter);
    return () => window.removeEventListener('keypress', handleEnter);
  }, [key, callback]);
}
