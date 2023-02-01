import React, { Component } from 'react';
import s from './Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

export default class Modal extends Component {
  handleOverlayClick = event => {
    const { target, currentTarget } = event;
    if (target === currentTarget) {
      this.props.closeModal();
    }
  };

  handleEscPressed = event => {
    if (event.key === 'Escape') {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscPressed);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscPressed);
  }

  render() {
    return createPortal(
      <div className={s.overlay} onClick={this.handleOverlayClick}>
        <div className={s.modal}>{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func,
  children: PropTypes.node,
};
