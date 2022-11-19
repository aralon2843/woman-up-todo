import { memo, useEffect, useRef } from 'react';
import useClickOutside from '../../../hooks/useClickOutside';

const Modal = ({ children, closeModal }) => {
  const modalRef = useRef();
  const { isVisible } = useClickOutside(modalRef);

  useEffect(() => {
    if (!isVisible) closeModal();
  }, [closeModal, isVisible]);

  return (
    <div className='modal_wrapper' ref={modalRef}>
      <div className='modal_inner'>
        <span className='modal_close' onClick={closeModal}>
          x
        </span>
        {children}
      </div>
    </div>
  );
};

export default memo(Modal);
