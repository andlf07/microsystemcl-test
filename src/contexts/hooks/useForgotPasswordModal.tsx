import React from 'react';
import { ForgotPasswordContext } from '../ForgotPasswordContext';

const useForgotPasswordModal = () => {
  const { isModalOpen, dispatchIsModalOpen } = React.useContext(ForgotPasswordContext);

  const handleModalIsOpen = () => dispatchIsModalOpen(!isModalOpen);

  return {
    isModalOpen,
    handleModalIsOpen,
  };
};

export default useForgotPasswordModal;
