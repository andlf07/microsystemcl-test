import { NextRequest } from 'next/server';
import { openConnection } from '~/backend/database/dbManager';
import { dbFinish } from '~/backend/database/sqlClient';
import { EndpointResponse } from '~/backend/interface/EndpointResponse';
import { getSequelizeError } from '~/backend/lib/getSequelizeError';
import { deleteUser, getOneUser, updateUser } from '~/backend/service/user.service';

export const GET = async (req: NextRequest, { params }: any) => {
  let response: EndpointResponse = {};

  try {
    const getUser = await getOneUser(params.id);

    if (getUser === null) {
      response.message = 'NOT_FOUND';

      response.statusCode = 404;

      return Response.json(response, { status: response.statusCode });
    }

    response.data = getUser;
    response.statusCode = 200;
    response.message = 'OK';

    await dbFinish();

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

export const DELETE = async (req: NextRequest, { params }: any) => {
  let response: EndpointResponse = {};

  try {
    const getUser = await deleteUser(params.id);

    if (getUser === null) {
      response.message = 'NOT_FOUND';

      response.statusCode = 404;

      return Response.json(response, { status: response.statusCode });
    }

    response.data = getUser;
    response.statusCode = 200;
    response.message = 'OK';

    await dbFinish();

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

export const PUT = async (req: NextRequest, { params }: any) => {
  let response: EndpointResponse = {};

  const data: any = await req.json();

  try {
    await openConnection();

    const update = await updateUser(params.id, data);

    response.data = update;
    response.statusCode = 201;
    response.message = 'OK';

    await dbFinish();

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
