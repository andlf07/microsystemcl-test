'use client';
import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { CustomSnackbarProvider } from '..';
import { ForgotPasswordContextProvider } from '~/contexts';

interface Props {
  children: ReactNode;
  session: any;
}

const Providers: React.FC<Props> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <CustomSnackbarProvider>
        <ForgotPasswordContextProvider>{children}</ForgotPasswordContextProvider>
      </CustomSnackbarProvider>
    </SessionProvider>
  );
};

export default Providers;
