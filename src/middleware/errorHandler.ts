import { type ErrorRequestHandler } from 'express';
import { ValidationError } from 'sequelize';

import { AppError, ErrorResponse } from '../lib/classes.ts';

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  if (err instanceof AppError) {
    const errorResponse = new ErrorResponse(err);

    res.status(err.statusCode).json(errorResponse);
  }

  if (err instanceof ValidationError) {
    const message = err.errors.map((item) => item.message).join('; ');
    const errorResponse = new ErrorResponse({
      statusCode: 400,
      message,
    });

    res.status(400).json(errorResponse);
  }

  const errorResponse = new ErrorResponse({
    statusCode: 500,
    message: err instanceof Error && err.message ? err.message : 'Something went wrong!',
  });

  res.status(500).json(errorResponse);

  if (err instanceof Error) {
    console.error(err.stack);
  }
};

export { errorHandler };
