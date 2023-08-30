// ModalPortal.js
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

const ModalPortal = ({ children, onClose }) => {
  const root = document.getElementById('root');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !root.contains(event.target) &&
        event.target.className !== 'filter-btn'
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return ReactDOM.createPortal(children, portalRoot);
};

export default ModalPortal;
