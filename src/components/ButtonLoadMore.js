import React from 'react';
import s from './common-styles.module.css';
import fetchAPI from '../services/fetchAPI';

export default class ButtonLoadMore extends React.Component {
  state = {
    page: 1,
  };

  incrementPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  clickLoadMoreBtn = () => {
    this.incrementPage();
    setTimeout(() => {
      this.callToApi();
    }, 5000);
  };

  callToApi = () => {
    const { name, onLoadMore } = this.props;
    const page = this.state.page;
    console.log(page);

    return fetchAPI(name, page).then(data => onLoadMore(data));
  };

  render() {
    return (
      <button
        type="button"
        className={s.btnMore}
        onClick={this.clickLoadMoreBtn}
      >
        Load more
      </button>
    );
  }
}
