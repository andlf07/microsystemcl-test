'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useForgotPasswordModal } from '~/contexts/hooks';
import { useNotification } from '.';

type Inputs = {
  email: string;
  password: string;
};

const useLogin = () => {
  const { handleModalIsOpen } = useForgotPasswordModal();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { notification } = useNotification();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({});

  const handleGoogleSignIn = () => signIn('google', { callbackUrl: '/dashboard' });

  const onSubmit: SubmitHandler<Inputs> = async (data, e: any) => {
    e.preventDefault();
    setIsLoading(true);
    signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    })
      .then(res => {
        if (res?.status === 401 || res?.status === 404) {
          notification('Credenciales inválidas.', { variant: 'error' });
        } else {
          router.replace('/dashboard');
          return notification('Inicio de sesión satisfactoriamente.', { variant: 'success' });
        }
      })
      .catch(() => {
        notification('Algo ha salido mal, vuelve a intentarlo.', { variant: 'error' });
      })
      .finally(() => setIsLoading(false));
  };

  return {
    handleSubmit,
    errors,
    control,
    onSubmit,
    isLoading,
    handleModalIsOpen,
    handleGoogleSignIn,
  };
};

export default useLogin;
