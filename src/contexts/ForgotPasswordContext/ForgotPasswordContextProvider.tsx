import React from 'react';
import { ForgotPasswordContext, ForgotPasswordInitialState } from '.';

const ForgotPasswordContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, dispatchIsModalOpen] = React.useState<boolean>(
    ForgotPasswordInitialState.isModalOpen
  );

  return (
    <ForgotPasswordContext.Provider
      value={{
        isModalOpen,
        dispatchIsModalOpen: dispatchIsModalOpen,
      }}
    >
      {children}
    </ForgotPasswordContext.Provider>
  );
};

export default ForgotPasswordContextProvider;
