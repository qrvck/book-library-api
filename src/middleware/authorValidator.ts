import type { NextFunction, Request, Response } from 'express';
import type { Attributes } from 'sequelize';

import { AppError } from '../lib/classes.ts';
import type { AuthorModel } from '../types/author.types.ts';

class AuthorValidator {
  create = (
    req: Request<unknown, unknown, Partial<Attributes<AuthorModel>>>,
    res: Response,
    next: NextFunction
  ) => {
    const VALIDATION_KEYS = ['firstName', 'lastName'] as const;
    const author = req.body;
    const validationErrors: string[] = [];

    VALIDATION_KEYS.map((key) => {
      const value = author[key];

      if (!value) {
        const error = `${key} is required field`;
        validationErrors.push(error);
      } else if (typeof value !== 'string') {
        const error = `${key} must be string`;
        validationErrors.push(error);
      }
    });

    if (validationErrors.length) {
      throw new AppError({
        statusCode: 400,
        message: validationErrors.join('; '),
      });
    }

    next();
  };

  update = this.create;
}

const authorValidator = new AuthorValidator();

export { authorValidator };
