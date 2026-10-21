import type { Request, Response } from 'express';
import type { Attributes, CreationAttributes } from 'sequelize';

import { SuccessResponse } from '../lib/classes.ts';
import { getOffset } from '../lib/getOffset.ts';
import { parseQueries } from '../lib/parseQueries.ts';
import { bookService } from '../services/book.service.ts';
import type { BaseParams } from '../types/base.types.ts';
import type { BookModel, BookQueries } from '../types/book.types.ts';

class BookController {
  findAll = async (req: Request<unknown, unknown, unknown, BookQueries>, res: Response) => {
    const { page, size, rest } = parseQueries(req.query);
    const offset = getOffset(page, size);

    const allAuthors = await bookService.findAll({
      offset,
      limit: size,
      where: rest,
    });

    const successResponse = new SuccessResponse(allAuthors);

    res.json(successResponse);
  };

  findById = async (req: Request<BaseParams>, res: Response) => {
    const { id } = req.params;
    const author = await bookService.findById(id);
    const successResponse = new SuccessResponse(author);

    res.json(successResponse);
  };

  create = async (req: Request<unknown, unknown, CreationAttributes<BookModel>>, res: Response) => {
    const author = await bookService.create(req.body);
    const successResponse = new SuccessResponse(author);

    res.status(201).json(successResponse);
  };

  update = async (
    req: Request<BaseParams, unknown, Partial<Attributes<BookModel>>>,
    res: Response
  ) => {
    const { id } = req.params;
    const author = await bookService.update(id, req.body);
    const successResponse = new SuccessResponse(author);

    res.status(200).json(successResponse);
  };

  delete = async (req: Request<BaseParams>, res: Response) => {
    const { id } = req.params;
    await bookService.delete(id);

    res.status(204).send();
  };
}

const bookController = new BookController();

export { bookController };
