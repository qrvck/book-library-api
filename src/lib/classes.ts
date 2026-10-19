class AppError extends Error {
  public readonly statusCode: number;
  public readonly message: string;

  constructor(params: { statusCode: number; message: string }) {
    const { statusCode, message } = params;

    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.name = 'AppError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}

class SuccessResponse<T> {
  public readonly data: T;

  constructor(data: T) {
    this.data = data;
  }
}

class ErrorResponse {
  public readonly error: {
    statusCode: number;
    message: string;
  };

  constructor(params: { statusCode: number; message: string }) {
    const { statusCode, message } = params;

    this.error = {
      statusCode,
      message,
    };
  }
}

export { AppError, ErrorResponse, SuccessResponse };
