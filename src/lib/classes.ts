class AppError extends Error {
  public statusCode: number;
  public message: string;

  constructor(params: { statusCode: number; message: string | string[] }) {
    const { statusCode, message } = params;

    const stringMessage = Array.isArray(message) ? message.join('; ') : message;

    super(stringMessage);
    this.statusCode = statusCode;
    this.message = stringMessage;
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
