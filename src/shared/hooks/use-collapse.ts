import { useState } from 'react';

export default function useCollapse<T>(defaultValue: T): [T, (value?: T) => void] {
  const [value, setValue] = useState<T>(defaultValue);

  const toggleValue = (newValue?: T) => {
    setValue((prev) => {
      if (typeof prev === 'boolean') {
        return (typeof newValue === 'boolean' ? newValue : !prev) as T;
      } else {
        return newValue !== undefined ? newValue : prev;
      }
    });
  };

  return [value, toggleValue];
}
