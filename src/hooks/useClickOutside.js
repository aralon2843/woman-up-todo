import { useCallback, useEffect, useState } from 'react';

const useClickOutside = (ref) => {
  const [isVisible, setVisible] = useState(true);
  const clickOutsideHandler = useCallback(
    (event) => {
      if (ref.current === event.target) {
        setVisible(false);
      }
    },
    [ref]
  );

  useEffect(() => {
    const refCurrent = ref.current;
    refCurrent.addEventListener('mousedown', clickOutsideHandler);
    return () => {
      refCurrent.removeEventListener('mousedown', clickOutsideHandler);
    };
  }, [clickOutsideHandler, ref]);

  return { isVisible };
};

export default useClickOutside;
