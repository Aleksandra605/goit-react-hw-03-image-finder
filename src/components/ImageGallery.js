import s from './common-styles.module.css';
import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchAPI from '../services/fetchAPI';
import ButtonLoadMore from './ButtonLoadMore';
import Modal from './Modal';
import sm from './modal-styles.module.css';

export default class ImageGallery extends React.Component {
  state = {
    pictures: null,
    status: 'idle',
    showModal: false,
    currentImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.name;
    const newName = this.props.name;
    const page = 1;

    // window.scrollTo({
    //   top: document.documentElement.scrollHeight,
    //   behavior: 'smooth',
    // });

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
    this.setState(prevState => ({
      pictures: [...prevState.pictures, ...data],
    }));

    return window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  openModal = event => {
    this.setState(state => ({
      showModal: true,
    }));

    const currentPic = this.state.pictures.find(
      pic => pic.id === +event.target.id,
    );

    this.setState({ currentImage: currentPic });
  };

  closeModalWindow = event => {
    this.setState({ showModal: false, currentImage: null });
  };

  render() {
    const { pictures, status, showModal } = this.state;

    return (
      <div>
        {showModal === true && (
          <Modal close={this.closeModalWindow}>
            <img
              src={this.state.currentImage.largeImageURL}
              alt={this.state.currentImage.tags}
              width="600px"
              className={sm.largeImage}
            />
          </Modal>
        )}
        {pictures === null && <p className={s.div}>Enter somethimg</p>}
        {status === 'pending' && (
          <div className={s.divLoader}>
            <Loader
              type="MutatingDots"
              color="#0b6470"
              secondaryColor="rgb(72, 163, 185)"
              height={100}
              width={100}
            />
          </div>
        )}
        {status === 'rejected' && <ToastContainer position="top-center" />}
        {status === 'resolved' && (
          <div className={s.contentBox}>
            <ul className={s.list}>
              {this.state.pictures.map(picture => (
                <ImageGalleryItem
                  src={picture.webformatURL}
                  alt={picture.tags}
                  key={picture.id}
                  click={this.openModal}
                  id={picture.id}
                />
              ))}
            </ul>
            <ButtonLoadMore
              name={this.props.name}
              onLoadMore={this.getMorePictures}
            />
          </div>
        )}
      </div>
    );
  }
}
