import React from 'react';
import s from './modal-styles.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector(`#modal-root`);

export default class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEsc);
  }

  closeByEsc = event => {
    if (event.code === 'Escape') {
      this.props.close();
    }
  };

  closeByBackdrop = event => {
    if (event.target.src) {
      return;
    }
    this.props.close();
  };

  render() {
    return createPortal(
      <div className={s.backdrop} onClick={this.closeByBackdrop}>
        {this.props.children}
      </div>,
      modalRoot,
    );
  }
}
