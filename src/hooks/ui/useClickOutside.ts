import React from "react";
import { useEffect, useRef } from "react";

export const useClickOutside = (
  handler: () => void,
  extraRef?: React.RefObject<HTMLElement | null>,
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutsideMain = ref.current && !ref.current.contains(target);
      const isOutsideExtra = extraRef?.current
        ? !extraRef.current.contains(target)
        : true;
      if (isOutsideMain && isOutsideExtra) {
        handler();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handler, extraRef]);

  return ref;
};
