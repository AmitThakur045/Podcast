import { useCallback, useEffect, useRef, useState } from "react";

export const useStateWithCallback = (initialState) => { 
  const [state, setState] = useState(initialState);
  const cbRef = useRef(null); // callback reference

  const updateState = useCallback((newState, cb) => {
    cbRef.current = cb;
    setState((prev) => {
      return typeof newState === "function" ? newState(prev) : newState;  // setState(newState)
    });
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      // when the state change call the callback function
      cbRef.current(state);
      cbRef.current = null;
    }
  }, [state]);

  return [state, updateState];
};
