// ModalPortal.js
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const ModalPortal = ({ children, onClose }) => {
  const portalRoot = document.getElementById('portal-root');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!portalRoot.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [portalRoot, onClose]);

  return ReactDOM.createPortal(children, portalRoot);
};

export default ModalPortal;
