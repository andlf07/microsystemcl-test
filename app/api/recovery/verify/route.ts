import { NextRequest } from 'next/server';
import { EndpointResponse } from '~/backend/interface/EndpointResponse';
import { getSequelizeError } from '~/backend/lib/getSequelizeError';
import { hashPassword } from '~/backend/lib/hashPassword';
import { isResetPasswordCodeExpired } from '~/backend/lib/isResetPasswordCodeExpired';
import { findOrCreatePasswordSalt } from '~/backend/service/passwordSalt.service';
import {
  getResetPasswordCodeByCode,
  updateResetPasswordCode,
} from '~/backend/service/resetPasswordCode.service';
import { getUserByEmail } from '~/backend/service/user.service';

export const POST = async (req: NextRequest) => {
  let response: EndpointResponse = {};
  const data: any = await req.json();

  try {
    const findCode = await getResetPasswordCodeByCode(data.code);

    if (!findCode || !findCode.enabled) {
      response.statusCode = 404;

      response.message = 'INVALID_CODE';

      return Response.json(response, { status: response.statusCode });
    }

    if (data.email !== findCode.email) {
      response.statusCode = 404;

      response.message = 'INVALID_CODE_EMAIL';

      return Response.json(response, { status: response.statusCode });
    }

    if (!isResetPasswordCodeExpired(findCode.createdAt)) {
      response.statusCode = 404;

      response.message = 'EXPIRED_CODE';

      return Response.json(response, { status: response.statusCode });
    }

    const findByEmail = await getUserByEmail(data.email);

    if (!findByEmail) {
      response.statusCode = 404;

      response.message = 'EMAIL_NOT_FOUND';

      return Response.json(response, { status: response.statusCode });
    }

    const { passwordHash, salt } = hashPassword(data.password);

    const updatePassword = await findOrCreatePasswordSalt({
      user_id: findByEmail.id,
      password: passwordHash,
      salt,
    });

    if (!updatePassword) {
      response.statusCode = 500;

      response.message = 'SERVER_ERROR';

      return Response.json(response, { status: response.statusCode });
    }

    const updateCode = await updateResetPasswordCode(findCode.id, { enabled: false });

    response.statusCode = 200;

    response.message = 'OK';

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
