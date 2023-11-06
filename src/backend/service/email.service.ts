import { EmailClient } from '@azure/communication-email';
import { config } from '~/consts/config';

export const sendEmail = async (payload: any) => {
  const emailClient = new EmailClient(config.EMAIL_AZURE_STRING);
  const { email, subject, text } = payload;

  try {
    const emailMessage = {
      senderAddress: config.EMAIL_AZURE_SENDER,
      content: {
        subject,
        plainText: text,
      },
      recipients: {
        to: [{ address: email }],
      },
    };

    const poller = await emailClient.beginSend(emailMessage);
    const result = poller.getResult();

    return result;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Error on sendCodeEmail: ${error}`);
  }
};
