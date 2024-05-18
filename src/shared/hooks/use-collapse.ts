import { useState } from 'react';

export default function useCollapse<T>(defaultValue: T): [T, () => void] {
  const [isVisible, setIsVisible] = useState<T>(defaultValue);

  const controlVisible = () => {
    setIsVisible((prev) => {
      if (typeof prev === 'boolean') {
        return !prev as T;
      } else {
        return prev;
      }
    });
  };

  return [isVisible, controlVisible];
}
