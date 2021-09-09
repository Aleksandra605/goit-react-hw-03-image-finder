import s from './common-styles.module.css';
import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchAPI from '../services/fetchAPI';
import ButtonLoadMore from './ButtonLoadMore';

export default class ImageGallery extends React.Component {
  state = {
    pictures: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.name;
    const newName = this.props.name;
    const page = this.state.page;

    if (prevName !== newName) {
      this.setState({ status: 'pending', pictures: null });

      return fetchAPI(newName, page)
        .then(({ hits }) => {
          if (hits.length > 0) {
            return this.setState({
              status: 'resolved',
              pictures: hits,
            });
          } else throw new Error(`По запросу ${newName} ничего не найдено`);
        })
        .catch(error => {
          this.setState({ status: 'rejected' });
          toast.error('No results were found for your search!');
        });
    }
  }

  getMorePictures = data => {
    return this.setState(prevState => ({
      pictures: [...prevState.pictures, data],
    }));
  };

  render() {
    const { pictures, status } = this.state;

    if (status === 'pending') {
      return (
        <div className={s.divLoader}>
          <Loader
            type="MutatingDots"
            color="#0b6470"
            secondaryColor="rgb(72, 163, 185)"
            height={100}
            width={100}
          />
        </div>
      );
    }

    if (pictures === null) {
      return <p className={s.div}>Enter somethimg</p>;
    }

    if (status === 'rejected') {
      return <ToastContainer position="top-center" />;
    }

    if (status === 'resolved') {
      return (
        <div className={s.contentBox}>
          <ul className={s.list}>
            {this.state.pictures.map(picture => (
              <ImageGalleryItem
                src={picture.webformatURL}
                alt={picture.tags}
                id={picture.id}
              />
            ))}
          </ul>
          <ButtonLoadMore
            name={this.props.name}
            onLoadMore={this.getMorePictures}
          />
        </div>
      );
    }
  }
}
