import { useEffect, useState } from 'react';

/**
 * Custom Hooks for Debounce value
 *
 * ```ts
 * // Example use
 *   const [searchQuery, setSearchQuery] = useState('');
 *   const valueQuery = useDebounce(searchQuery, 1000);
 * ```
 */

const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
