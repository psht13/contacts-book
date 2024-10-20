import { HttpError } from 'http-errors';

export const errorHandlerMiddleware = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: 'Http error',
      data: err.message + ' | ' + err.errors.details[0].message || 'Some error',
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
