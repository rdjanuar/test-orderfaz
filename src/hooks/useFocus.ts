import React, { useRef, useEffect } from "react";

export const useFocus = <T extends HTMLInputElement>() => {
  const ref = useRef<T>(null!);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return ref;
};
