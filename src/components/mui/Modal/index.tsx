import React from 'react';
import { ModalProps, Modal as MuiModal } from '@mui/material';

interface Props extends ModalProps {}

const Modal: React.FC<Props> = ({ children, ...props }) => {
  return <MuiModal {...props}>{children}</MuiModal>;
};

export default Modal;
