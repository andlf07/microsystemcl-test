import { EndpointResponse } from '../interface/EndpointResponse';

export const getSequelizeError = (error: any): EndpointResponse | void => {
  const parseError = JSON.parse(error.message);
  let response: EndpointResponse = {};

  // Validation error
  if (parseError.type === 'SequelizeValidationError') {
    response.message = 'BAD_REQUEST';

    response.error = parseError.message;

    response.statusCode = 404;

    return response;
  }
  // Unique Constraint
  if (parseError.type === 'SequelizeUniqueConstraintError') {
    response.message = 'ALREADY_EXIST';

    response.error = parseError.message;

    response.statusCode = 409;

    return response;
  }

  if (parseError.type === 'SequelizeForeignKeyConstraintError') {
    response.message = 'BAD_REQUEST';

    response.error = parseError.message;

    response.statusCode = 404;

    return response;
  }

  if (parseError.type === 'SequelizeDatabaseError') {
    response.message = 'BAD_REQUEST';

    response.error = parseError.message;

    response.statusCode = 404;

    return response;
  }
};
