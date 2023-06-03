import React, { useState, useEffect } from "react";

export const useDebounce = <T extends unknown>(
  defaultValue: T,
  wait?: number
): T => {
  const [state, setState] = useState<T>(defaultValue);

  useEffect(() => {
    const time = setTimeout(() => {
      setState(defaultValue);
    }, wait || 500);

    return () => clearTimeout(time);
  }, [defaultValue, wait]);

  return state;
};
