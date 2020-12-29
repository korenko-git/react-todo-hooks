import { useState } from 'react';

import Modal from 'components/Modal/Modal';

const withModal = (WrappedComponent) => (rest) => {
  const [isModalOpen, setIsOpenModal] = useState(false);

  const [modalConfig, setModalConfig] = useState({
    title: '',
    body: [],
  });

  const openModal = (title, body) => {
    setModalConfig({
      title,
      body,
    });

    setIsOpenModal(true);
  };

  const closeModal = (event) => {
    if (event) event.preventDefault();
    setIsOpenModal(false);
  };

  const props = {
    isModalOpen,
    modalConfig,
    openModal,
    closeModal,
  };

  return (
    <>
      <WrappedComponent {...props} {...rest} />
      <Modal {...props} />
    </>
  );
};

export default withModal;
