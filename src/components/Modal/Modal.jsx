import { createPortal } from 'react-dom';
import  { useEffect,useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

import  css from './Modal.module.css';

const newDiv = document.createElement("div");
newDiv.id='ModalRoot';
document.body.appendChild(newDiv);
const ModalRoot = document.querySelector('#ModalRoot');

const Modal = ({onClose,image}) =>{

  useEffect(()=>{
   return  window.addEventListener('keydown', keyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useLayoutEffect(() => {
  return () => {
    window.removeEventListener('keydown', keyDown);
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

const keyDown = e => {
  if (e.code === 'Escape') {
    onClose();
  }
};

const onOverlayClose = e => {
  if (e.currentTarget === e.target) {
   onClose();
  }
};
const { largeImageURL } = image;
return createPortal(
  <div onClick={onOverlayClose} className={css.Overlay}>
    <div className={css.Modal}>
      <img src={largeImageURL} alt="img" />
    </div>
  </div>,
  ModalRoot
);
}

export default Modal;

Modal.propTypes = {
  image: PropTypes.object,
  onClose: PropTypes.func,
};