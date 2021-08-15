import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({className, children}) => (
  <div className={'modal ' + className}>
    <div className="modal__substrate"></div>
    <div className="modal__content">
      {children}
    </div>
  </div>
);

Modal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element,
};

export default Modal;
