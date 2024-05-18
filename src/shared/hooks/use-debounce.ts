import { useEffect, useState } from 'react';

/**
 * @param value
 * @param duration
 * @returns debounce value
 */
export default function useDebounce(value: string, duration: number = 500) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, duration);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debounceValue;
}
