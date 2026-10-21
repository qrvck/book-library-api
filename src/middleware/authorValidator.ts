import type { NextFunction, Request, Response } from 'express';
import type { Attributes } from 'sequelize';

import { AppError } from '../lib/classes.ts';
import { type IValidationRule, validator } from '../lib/validator.ts';
import type { IAuthorModel } from '../types/author.types.ts';

const createRules: IValidationRule[] = [
  {
    key: 'firstName',
    required: true,
    type: 'string',
  },

  {
    key: 'lastName',
    required: true,
    type: 'string',
  },
];

class AuthorValidator {
  create = (
    req: Request<unknown, unknown, Partial<Attributes<IAuthorModel>>>,
    res: Response,
    next: NextFunction
  ) => {
    const validationErrors = validator(req.body, createRules);

    if (validationErrors.length) {
      throw new AppError({
        statusCode: 400,
        message: validationErrors,
      });
    } else {
      next();
    }
  };

  update = this.create;
}

const authorValidator = new AuthorValidator();

export { authorValidator };
