import { NextRequest } from 'next/server';
import { EndpointResponse } from '~/backend/interface/EndpointResponse';
import { getSequelizeError } from '~/backend/lib/getSequelizeError';
import { signToken } from '~/backend/lib/signToken';
import { getUserByEmail } from '~/backend/service/user.service';

export const POST = async (req: NextRequest) => {
  let response: EndpointResponse = {};

  const data: any = await req.json();

  try {
    const getByEmail = await getUserByEmail(data.email);

    if (getByEmail === null) {
      response.statusCode = 401;

      response.message = 'UNAUTHORIZED';

      return Response.json(response, { status: response.statusCode });
    }

    const { first_name, last_name, enabled, email, authProvider, ...rest } = getByEmail;

    const payload = { first_name, last_name, enabled, email, authProvider };

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
