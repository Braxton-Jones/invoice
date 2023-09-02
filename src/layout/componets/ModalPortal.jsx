import { useEffect } from 'react';
import ReactDOM from 'react-dom';

const ModalPortal = ({ children, onClose }) => {
  const portalroot = document.getElementById('portal-root');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !portalroot.contains(event.target) &&
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

  return ReactDOM.createPortal(children, portalroot);
};

export default ModalPortal;
