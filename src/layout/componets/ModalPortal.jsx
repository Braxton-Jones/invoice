import ReactDOM from 'react-dom';

const ModalPortal = ({ children }) => {
  const portalRoot = document.getElementById('portal-root');
  return ReactDOM.createPortal(children, portalRoot);
};

export default ModalPortal;
