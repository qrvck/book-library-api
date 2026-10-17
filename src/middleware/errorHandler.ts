import { type ErrorRequestHandler } from "express";
import { ErrorResponse } from "../lib/classes.ts";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let message = "Something went wrong!";

  if (err instanceof Error && err.message) {
    message = err.message;
  }

  const errorResponse = new ErrorResponse({
    statusCode: 500,
    message,
  });

  res.status(500).json(errorResponse);

  console.error(err.stack);
};

export { errorHandler };
