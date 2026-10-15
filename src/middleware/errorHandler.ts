import express, { type ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: {
      statusCode: 500,
      message: "Something went wrong!",
    },
  });
};

export { errorHandler };
