'use client';
import React from 'react';
import { SnackbarProvider } from 'notistack';
import { inter } from '~/theme';

interface Props {
  children: React.ReactNode;
}

const CustomSnackbarProvider: React.FC<Props> = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      autoHideDuration={2000}
      style={{ fontFamily: inter.style.fontFamily, fontWeight: '500' }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default CustomSnackbarProvider;
