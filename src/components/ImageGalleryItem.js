import s from './common-styles.module.css';
import React from 'react';

export default class ImageGalleryItem extends React.Component {
  render() {
    const { src, alt, id } = this.props;
    return (
      <li className={s.item} key={id}>
        <img
          src={src}
          alt={alt}
          className={s.img}
          height="196px"
          width="270px"
        />
      </li>
    );
  }
}
