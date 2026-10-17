import type { Request, Response } from "express";
import { authorService } from "../services/author.service.ts";
import type {
  AuthorModel,
  AuthorParams,
  AuthorQueries,
} from "../types/author.types.ts";
import { AppError, ErrorResponse, SuccessResponse } from "../lib/classes.ts";
import type { Attributes, CreationAttributes } from "sequelize";

class AuthorController {
  async findAll(
    req: Request<unknown, unknown, unknown, AuthorQueries>,
    res: Response,
  ) {
    const allAuthors = await authorService.findAll(req.query);
    const successResponse = new SuccessResponse(allAuthors);

    res.json(successResponse);
  }

  async findById(req: Request<AuthorParams>, res: Response) {
    try {
      const { id } = req.params;
      const author = await authorService.findById(id);
      const successResponse = new SuccessResponse(author);

      res.json(successResponse);
    } catch (error) {
      if (error instanceof AppError) {
        const errorResponse = new ErrorResponse(error);

        res.status(error.statusCode).json(errorResponse);
      }
    }
  }

  async create(
    req: Request<unknown, unknown, CreationAttributes<AuthorModel>>,
    res: Response,
  ) {
    try {
      const author = await authorService.create(req.body);
      const successResponse = new SuccessResponse(author);

      res.status(201).json(successResponse);
    } catch (error) {
      if (error instanceof AppError) {
        const errorResponse = new ErrorResponse(error);

        res.status(error.statusCode).json(errorResponse);
      }
    }
  }

  async update(
    req: Request<AuthorParams, unknown, Partial<Attributes<AuthorModel>>>,
    res: Response,
  ) {
    try {
      const { id } = req.params;
      const author = await authorService.update(id, req.body);
      const successResponse = new SuccessResponse(author);

      res.status(200).json(successResponse);
    } catch (error) {
      if (error instanceof AppError) {
        const errorResponse = new ErrorResponse(error);

        res.status(error.statusCode).json(errorResponse);
      }
    }
  }

  async delete(req: Request<AuthorParams>, res: Response) {
    try {
      const { id } = req.params;
      await authorService.delete(id);

      res.status(204).send();
    } catch (error) {
      if (error instanceof AppError) {
        const errorResponse = new ErrorResponse(error);

        res.status(error.statusCode).json(errorResponse);
      }
    }
  }
}

const authorController = new AuthorController();

export { authorController };
