import { NextRequest } from 'next/server';
import { EndpointResponse } from '~/backend/interface/EndpointResponse';
import { getSequelizeError } from '~/backend/lib/getSequelizeError';
import { hashPassword } from '~/backend/lib/hashPassword';
import { pagination } from '~/backend/lib/pagination';
import { createPasswordSalt, updatePasswordSalt } from '~/backend/service/passwordSalt.service';
import { createUser, getAllUsers } from '~/backend/service/user.service';

export const GET = async (req: NextRequest) => {
  let response: EndpointResponse = {};
  const { searchParams } = new URL(req.url);

  const searchParamsObject: any = {};

  for (const [key, value] of searchParams) {
    searchParamsObject[key] = value;
  }

  try {
    const { page: reqPage, pageSize: reqPageSize, ...restParams } = searchParamsObject;
    const pager = {
      page: reqPage,
      pageSize: reqPageSize,
    };

    const { page, pageSize } = pagination(pager);

    const { data, count, totalPages } = await getAllUsers(restParams, { page, pageSize });

    response.data = data;
    response.statusCode = 200;
    response.message = 'OK';
    response.pagination = {
      count: count,
      page,
      pageSize,
      totalPages,
    };

    return Response.json(response, { status: response.statusCode });
  } catch (error) {
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

export const POST = async (req: NextRequest) => {
  let response: EndpointResponse = {};

  const { confirmPassword, ...rest }: any = await req.json();

  try {
    const { passwordHash: password, salt } = hashPassword(rest.password);

    const createPassword = await createPasswordSalt({
      password: password,
      salt,
    });

    const create = await createUser(rest);

    const updatePasswordData = {
      user_id: create.id,
    };

    await updatePasswordSalt(createPassword.id, updatePasswordData);

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
