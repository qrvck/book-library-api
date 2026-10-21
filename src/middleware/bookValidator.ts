import type { NextFunction, Request, Response } from 'express';
import type { Attributes } from 'sequelize';

import { AppError } from '../lib/classes.ts';
import { type IValidationRule, validator } from '../lib/validator.ts';
import type { IBookModel } from '../types/book.types.ts';

const createRules: IValidationRule[] = [
  {
    key: 'title',
    required: true,
    type: 'string',
  },

  {
    key: 'authorId',
    required: true,
    type: 'number',
  },

  {
    key: 'isbn',
    required: true,
    type: 'string',
  },

  {
    key: 'publishYear',
    required: false,
    type: 'number',
  },
];

class BookValidator {
  create = (
    req: Request<unknown, unknown, Partial<Attributes<IBookModel>>>,
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

const bookValidator = new BookValidator();

export { bookValidator };
