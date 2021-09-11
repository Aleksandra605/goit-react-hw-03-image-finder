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
    }, 500);
  };

  callToApi = () => {
    const { name, onLoadMore } = this.props;
    const page = this.state.page;

    return fetchAPI(name, page).then(data => onLoadMore(data.hits));
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
