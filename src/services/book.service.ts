import type { Attributes, CreationAttributes, Identifier } from "sequelize";
import type { BookModel, BookQueries } from "../types/book.types.ts";
import { bookRepository } from "../repositories/book.repository.ts";
import { AppError } from "../lib/classes.ts";
import { authorService } from "./author.service.ts";
import { getOffset } from "../lib/utils.ts";

class BookService {
  async findAll(queries: BookQueries) {
    const { page = 1, size: limit = 100, ...where } = queries;
    const offset = getOffset(page, limit);

    return await bookRepository.findAll({
      offset,
      limit,
      where,
    });
  }

  async findById(id: Identifier) {
    const book = await bookRepository.findById(id);

    if (!book) {
      throw new AppError({
        statusCode: 404,
        message: "Book not found!",
      });
    }

    return book;
  }

  async create(book: CreationAttributes<BookModel>) {
    const { id, ...safeBook } = book;

    await authorService.findById(book.authorId);
    return await bookRepository.create(safeBook);
  }

  async update(id: Identifier, book: Partial<Attributes<BookModel>>) {
    const { id: _, ...safeBook } = book;
    const [updatedCount] = await bookRepository.update(id, safeBook);

    if (updatedCount === 0) {
      throw new AppError({
        statusCode: 404,
        message: "Book not found!",
      });
    }

    return await this.findById(id);
  }

  async delete(id: Identifier) {
    await this.findById(id);
    return await bookRepository.delete(id);
  }
}

const bookService = new BookService();

export { bookService };
