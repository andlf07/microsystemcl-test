import { NextRequest } from 'next/server';
import { EndpointResponse } from '~/backend/interface/EndpointResponse';
import { genResetPasswordCode } from '~/backend/lib/genResetPasswordCode';
import { getSequelizeError } from '~/backend/lib/getSequelizeError';
import { sendEmail } from '~/backend/service/email.service';
import { createResetPasswordCode } from '~/backend/service/resetPasswordCode.service';
import { getUserByEmail } from '~/backend/service/user.service';

export const POST = async (req: NextRequest) => {
  let response: EndpointResponse = {};

  const data: any = await req.json();

  try {
    // await openConnection();

    const findByEmail = await getUserByEmail(data.email);

    if (findByEmail === null) {
      response.statusCode = 404;

      response.message = 'NOT_FOUND';

      return Response.json(response, { status: response.statusCode });
    }

    const genCode = genResetPasswordCode();

    const createCode = await createResetPasswordCode({ email: findByEmail.email, code: genCode });

    // await closeConnection();

    if (createCode) {
      const emailPayload = {
        subject: 'Recuperacion de clave Closeup',
        text: `Para crear una nueva clave debes ingresar el siguiente codigo: ${createCode.code}
        `,

        email: data.email,
      };

      await sendEmail(emailPayload);
      response.message = 'CREATED';

      response.statusCode = 201;

      return Response.json(response, { status: response.statusCode });
    }

    response.message = 'OK';

    response.statusCode = 200;

    return Response.json(response, { status: response.statusCode });
  } catch (error: any) {
    const getError = getSequelizeError(error);

    if (getError) {
      response = getError;
    } else {
      response.message = 'SERVER_ERROR';

      response.error = `${error}`;

      response.statusCode = 500;
    }
    return Response.json(response, { status: response.statusCode });
  }
};
