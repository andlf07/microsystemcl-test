import { OptionsObject, useSnackbar } from 'notistack';

const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const notification = (message: string, options?: OptionsObject) => {
    enqueueSnackbar(message, { ...options });
  };

  return {
    notification,
  };
};

export default useNotification;
