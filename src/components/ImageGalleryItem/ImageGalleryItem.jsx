import  {useState } from 'react';

import css from  './ImageGalleryItem.module.css';
import Modal from '../Modal';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ item }) => {
const [ shownModal , setShownModal] = useState(false);

const onModal = () => {
  setShownModal( !shownModal )
};
const { webformatURL } = item;
return (
  <li className={css.gallery_item}>
    <img
      onClick={onModal}
      className={css.gallery_img}
      src={webformatURL}
      alt="img"
    />
    {shownModal && <Modal onClose={onModal} image={item} />}
  </li>
);
}
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  item: PropTypes.object,
};