import { config } from '~/consts/config';
import { useAxios } from '~/hooks';

const useSendEmailRecovery = () => {
  const { requests } = useAxios();

  const sendEmail = async (data: { email: string }) =>
    await requests({
      url: config.HOST_BASE + config.SEND_EMAIL_CODE_ENDPOINT,
      method: 'POST',
      data: { email: data.email },
      headers: { 'Content-Type': 'application/json' },
    });
  return {
    sendEmail,
  };
};

export default useSendEmailRecovery;
