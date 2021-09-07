import React from 'react';
import { BiSearch } from 'react-icons/bi';
import s from './searchBar-styles.module.css';

export default class Searchbar extends React.Component {
  state = {
    name: '',
  };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.name.trim() === '') {
      alert('Enter a word');
      return;
    }
    this.props.onSubmit(this.state.name.trim());
    this.reset();
  };

  reset = () => {
    this.setState({ name: '' });
  };

  render() {
    const { name } = this.state;
    return (
      <header className={s.header}>
        <form onSubmit={this.handleSubmit} className={s.form}>
          <button type="submit" className={s.btn}>
            <span>
              <BiSearch />
            </span>
          </button>

          <input
            name="name"
            className={s.search}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={name}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
