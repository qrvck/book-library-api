import type { Request, Response } from "express";
import { bookService } from "../services/book.service.ts";
import type {
  BookModel,
  BookParams,
  BookQueries,
} from "../types/book.types.ts";
import { SuccessResponse } from "../lib/classes.ts";
import type { Attributes, CreationAttributes } from "sequelize";

class BookController {
  async findAll(
    req: Request<unknown, unknown, unknown, BookQueries>,
    res: Response,
  ) {
    const allAuthors = await bookService.findAll(req.query);
    const successResponse = new SuccessResponse(allAuthors);

    res.json(successResponse);
  }

  async findById(req: Request<BookParams>, res: Response) {
    const { id } = req.params;
    const author = await bookService.findById(id);
    const successResponse = new SuccessResponse(author);

    res.json(successResponse);
  }

  async create(
    req: Request<unknown, unknown, CreationAttributes<BookModel>>,
    res: Response,
  ) {
    const author = await bookService.create(req.body);
    const successResponse = new SuccessResponse(author);

    res.status(201).json(successResponse);
  }

  async update(
    req: Request<BookParams, unknown, Partial<Attributes<BookModel>>>,
    res: Response,
  ) {
    const { id } = req.params;
    const author = await bookService.update(id, req.body);
    const successResponse = new SuccessResponse(author);

    res.status(200).json(successResponse);
  }

  async delete(req: Request<BookParams>, res: Response) {
    const { id } = req.params;
    await bookService.delete(id);

    res.status(204).send();
  }
}

const bookController = new BookController();

export { bookController };
