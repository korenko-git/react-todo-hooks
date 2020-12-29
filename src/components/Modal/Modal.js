/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { useEffect } from 'react';

import Button from 'components/shared/Button.css.js';
import StyledModal from './Modal.css.js';

let modalRoot = document.getElementById('modal-root');
if (!modalRoot) {
  modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);
}

const Modal = ({ modalConfig, closeModal, isModalOpen }) => {
  const { title, body } = modalConfig;

  const onEscKeyDown = (event) => {
    if (event.key !== 'Escape') return;
    closeModal();
  };

  useEffect(() => {
    window.addEventListener('keydown', onEscKeyDown, false);

    return () => {
      window.removeEventListener('keydown', onEscKeyDown, false);
    };
  }, []);

  return ReactDOM.createPortal(
    <Transition in={isModalOpen} timeout={150} unmountOnExit mountOnEnter>
      {(state) => (
        <StyledModal state={state} role="dialog">
          <div className="box-dialog">
            <div className="box-header">
              <h4 className="box-title">{title}</h4>
              <Button onClick={closeModal} className="x-close"></Button>
            </div>

            {body}
          </div>

          <div
            className="background"
            data-testid="background"
            onMouseDown={closeModal}
          />
        </StyledModal>
      )}
    </Transition>,
    modalRoot,
  );
};

Modal.propTypes = {
  modalConfig: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
    ]),
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};

export default Modal;
