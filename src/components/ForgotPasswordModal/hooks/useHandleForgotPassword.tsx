import React from 'react';
import { useForm } from 'react-hook-form';
import { useForgotPasswordModal } from '~/contexts/hooks';
import { useSendEmailRecovery, useVerifyPasswordCode } from '.';
import { useNotification } from '~/hooks';

const useHandleForgotPassword = () => {
  const { handleModalIsOpen, isModalOpen } = useForgotPasswordModal();
  const [forgotStep, setForgotStep] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [requestsError, setRequestsError] = React.useState<any>(null);
  const { sendEmail } = useSendEmailRecovery();
  const { verifyPasswordCode } = useVerifyPasswordCode();
  const { notification } = useNotification();

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({});

  const getFormState = () => getValues();

  const onSubmit = async (data: any, e: any) => {
    e.preventDefault();
    setIsLoading(true);

    if (forgotStep === 0) {
      sendEmail(data)
        .then(() => {
          notification('Email enviado sastifactoriamente.', { variant: 'success' });
          setForgotStep(1);
        })
        .catch((err: any) => {
          notification('Algo ha salido mal, vuelve a intentarlo.', { variant: 'error' });
          setRequestsError(err.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    if (forgotStep === 1) {
      setForgotStep(2);
      setIsLoading(false);
    }

    if (forgotStep === 2) {
      verifyPasswordCode(data)
        .then(() => {
          notification('Contraseña actualizada sastifactoriamente.', { variant: 'success' });
          setForgotStep(0);
        })
        .catch((err: any) => {
          notification('Algo ha salido mal, vuelve a intentarlo.', { variant: 'success' });
          setRequestsError(err.data);
        })
        .finally(() => {
          handleModalIsOpen();
          setIsLoading(false);
        });
    }
  };

  return {
    handleSubmit,
    control,
    onSubmit,
    handleModalIsOpen,
    isModalOpen,
    errors,
    forgotStep,
    getFormState,
    isLoading,
    requestsError,
    getValues,
  };
};

export default useHandleForgotPassword;
