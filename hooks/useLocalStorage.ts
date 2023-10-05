import { useState, useEffect } from 'react';

export const LS_KEY_SCORE = 'score';
export const LS_KEY_USER_NAME = 'user-name';

export default function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setData] = useState(defaultValue);

  useEffect(() => {
    const dataLS = localStorage.getItem(key);

    if (dataLS) {
      setData(JSON.parse(dataLS) as T);
    }
  }, [key]);

  useEffect(() => {
    if (value) {
      if (
        (typeof value === 'string' && value !== '') ||
        (typeof value === 'object' && Object.keys(value).length !== 0)
      ) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    }
  }, [key, value]);

  return [value, setData] as const;
}
