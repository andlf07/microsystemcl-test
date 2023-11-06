import { config } from '~/consts/config';
import { useAxios } from '~/hooks';

interface Data {
  email: string;
  otpCode: string;
  newPassword: string;
}

const useVerifyPasswordCode = () => {
  const { requests } = useAxios();

  const verifyPasswordCode = async (data: Data) =>
    await requests({
      url: config.HOST_BASE + config.VERIFY_CODE_ENDPOINT,
      method: 'POST',
      data: { email: data.email, code: data.otpCode, password: data.newPassword },
      headers: { 'Content-Type': 'application/json' },
    });

  return {
    verifyPasswordCode,
  };
};

export default useVerifyPasswordCode;
