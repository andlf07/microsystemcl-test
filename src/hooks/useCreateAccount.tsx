import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateUser, useNotification } from '.';

const useCreateAccount = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { createUser } = useCreateUser();
  const { notification } = useNotification();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({});

  const onSubmit: SubmitHandler<any> = async (data, e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log(data);

    createUser(data)
      .then(res => {
        if (res.data.statusCode === 201) {
          notification('Usuario creado sastifactoriamente.', { variant: 'success' });
          router.push('/login');
        }
      })
      .catch(err => {
        console.log(err);
        notification('Error al crear el usuario, vuelve a intentar.', { variant: 'error' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { onSubmit, handleSubmit, control, loading, getValues, errors };
};

export default useCreateAccount;
