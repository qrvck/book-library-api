import type { Request, Response } from 'express';
import type { Attributes, CreationAttributes } from 'sequelize';

import { SuccessResponse } from '../lib/classes.ts';
import { authorService } from '../services/author.service.ts';
import type { AuthorModel } from '../types/author.types.ts';
import type { BaseParams, BaseQueries } from '../types/base.types.ts';

class AuthorController {
  findAll = async (req: Request<unknown, unknown, unknown, BaseQueries>, res: Response) => {
    const allAuthors = await authorService.findAll(req.query);
    const successResponse = new SuccessResponse(allAuthors);

    res.json(successResponse);
  };

  findById = async (req: Request<BaseParams>, res: Response) => {
    const { id } = req.params;
    const author = await authorService.findById(id);
    const successResponse = new SuccessResponse(author);

    res.json(successResponse);
  };

  create = async (
    req: Request<unknown, unknown, CreationAttributes<AuthorModel>>,
    res: Response
  ) => {
    const author = await authorService.create(req.body);
    const successResponse = new SuccessResponse(author);

    res.status(201).json(successResponse);
  };

  update = async (
    req: Request<BaseParams, unknown, Partial<Attributes<AuthorModel>>>,
    res: Response
  ) => {
    const { id } = req.params;
    const author = await authorService.update(id, req.body);
    const successResponse = new SuccessResponse(author);

    res.status(200).json(successResponse);
  };

  delete = async (req: Request<BaseParams>, res: Response) => {
    const { id } = req.params;
    await authorService.delete(id);

    res.status(204).send();
  };
}

const authorController = new AuthorController();

export { authorController };
