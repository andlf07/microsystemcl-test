import { config } from '~/consts/config';
import { useAxios } from '.';

const useCreateUser = () => {
  const { requests } = useAxios();

  const createUser = async (data: any) => {
    return requests({
      url: config.USERS_ENDPOINT,
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return { createUser };
};

export default useCreateUser;
