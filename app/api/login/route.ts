import bcrypt from 'bcrypt';
import { NextRequest } from 'next/server';
import { EndpointResponse } from '~/backend/interface/EndpointResponse';
import { getSequelizeError } from '~/backend/lib/getSequelizeError';
import { signToken } from '~/backend/lib/signToken';
import { getUserByEmail } from '~/backend/service/user.service';

export const POST = async (req: NextRequest) => {
  let response: EndpointResponse = {};

  const data: any = await req.json();

  console.log(data);

  try {
    const getByEmail = await getUserByEmail(data.email);

    if (getByEmail === null) {
      response.statusCode = 401;

      response.message = 'UNAUTHORIZED';

      return Response.json(response, { status: response.statusCode });
    }

    if (getByEmail.password === null) {
      response.statusCode = 400;

      response.message = 'UNAUTHORIZED_CREATE_PASSWORD';

      return Response.json(response, { status: response.statusCode });
    }

    const checkPassword = await bcrypt.compare(data.password, getByEmail?.password.password);

    if (!checkPassword) {
      response.statusCode = 401;

      response.message = 'UNAUTHORIZED';

      return Response.json(response, { status: response.statusCode });
    }

    const { first_name, last_name, enabled, email, ...rest } = getByEmail;

    const payload = { first_name, last_name, enabled, email };

    const token = signToken(payload);

    response.statusCode = 200;

    response.message = 'AUTHORIZED';

    response.token = token;

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
