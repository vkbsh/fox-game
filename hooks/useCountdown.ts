import { useEffect, useState } from 'react';

export default function useCountdown(
  timerInSec: number,
  callback?: () => void,
): [number, () => void] {
  const [timeLeft, setTimeLeft] = useState(timerInSec);
  const [isReadyToStart, setIsReadyToStart] = useState(false);

  useEffect(() => {
    if (!isReadyToStart) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          return prev;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isReadyToStart]);

  useEffect(() => {
    if (timeLeft === 0 && typeof callback === 'function') {
      callback();
    }
  }, [timeLeft]);

  const start = () => {
    setIsReadyToStart(true);
  };

  return [timeLeft, start];
}
