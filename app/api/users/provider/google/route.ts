import { NextRequest } from 'next/server';
import { EndpointResponse } from '~/backend/interface/EndpointResponse';
import { getSequelizeError } from '~/backend/lib/getSequelizeError';
import { findOrCreateUser } from '~/backend/service/user.service';

export const POST = async (req: NextRequest) => {
  let response: EndpointResponse = {};

  const data: any = await req.json();

  try {
    const create = await findOrCreateUser(data);

    response.data = create;

    response.statusCode = 201;

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
