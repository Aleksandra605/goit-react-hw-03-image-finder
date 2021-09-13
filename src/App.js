import './App.css';
import React from 'react';
import Searchbar from './components/search-bar/SearchBar';
import ImageGallery from './components/gallery/ImageGallery';

export default class App extends React.Component {
  state = {
    name: '',
  };

  handleFormSubmit = someName => {
    this.setState({ name: someName });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery name={this.state.name} />
      </div>
    );
  }
}
