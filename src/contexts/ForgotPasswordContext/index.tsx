import { createContext, Dispatch, SetStateAction } from 'react';

interface InitialState {
  isModalOpen: boolean;
  dispatchIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const ForgotPasswordInitialState: InitialState = {
  isModalOpen: false,
  dispatchIsModalOpen: () => {},
};

export const ForgotPasswordContext = createContext<InitialState>(ForgotPasswordInitialState);
