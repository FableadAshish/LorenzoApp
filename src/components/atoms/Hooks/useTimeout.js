import { useEffect, useRef } from "react";

const useTimeout = (callback, delay = 2000, condition) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let id;

    const tick = () => {
      savedCallback.current();
    };

    if (condition) {
      id = setTimeout(tick, delay);
    }

    return () => {
      clearTimeout(id);
    };
  }, [delay, condition]);
};

export default useTimeout;
