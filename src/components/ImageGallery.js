import s from './common-styles.module.css';
import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from 'react-loader-spinner';

export default class ImageGallery extends React.Component {
  state = {
    pictures: null,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.name !== this.props.name) {
      this.setState({ loading: true });
      setTimeout(() => {
        return this.fetchArticles(this.props.name).finally(
          this.setState({ loading: false }),
        );
      }, 2000);
    }
  }

  fetchArticles = query => {
    const options = {
      headers: {
        API_KEY: '22346154-3962a348b9ad97506a5be6443',
      },
    };
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=1&per_page=12&key=${options.headers.API_KEY}`;

    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(
          new Error(
            `По запросу ${query} ничего не найдено (this is in reject)`,
          ),
        );
      })
      .then(({ hits }) => {
        if (hits.length > 0) {
          return this.setState({ pictures: hits });
        } else throw new Error(`По запросу ${query} ничего не найдено`);
        // return hits;
      })
      .catch(error => {
        console.log(error);
        this.setState({ error });
      });
  };

  render() {
    return (
      <div>
        {!this.state.pictures ? (
          <div className={s.div}>Enter somethimg</div>
        ) : (
          <ul className={s.list}>
            {this.state.pictures.map(picture => (
              <ImageGalleryItem
                src={picture.webformatURL}
                alt={picture.tags}
                key={picture.id}
              />
            ))}
          </ul>
        )}
        {this.state.loading && (
          <div className={s.divLoader}>
            <Loader type="Oval" color="#0b6470" height={50} width={50} />
          </div>
        )}
      </div>
    );
  }
}
