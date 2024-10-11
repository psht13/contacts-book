import createHttpError from 'http-errors';

export const notFoundHandlerMiddleware = (_req, _res, _next) => {
  throw createHttpError.NotFound('Route not found');
};
