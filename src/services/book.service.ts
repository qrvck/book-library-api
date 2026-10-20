import type { Attributes, CreationAttributes, Identifier } from 'sequelize';

import { AppError } from '../lib/classes.ts';
import { getOffset } from '../lib/getOffset.ts';
import { bookRepository } from '../repositories/book.repository.ts';
import type { BookModel, BookQueries } from '../types/book.types.ts';
import { authorService } from './author.service.ts';

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
        message: 'Book not found!',
      });
    }

    return book;
  }

  async create(book: CreationAttributes<BookModel>) {
    const safeBook = {
      ...book,
    };

    delete safeBook.id;

    await authorService.findById(book.authorId);
    return await bookRepository.create(safeBook);
  }

  async update(id: Identifier, book: Partial<Attributes<BookModel>>) {
    const safeBook = {
      ...book,
    };

    delete safeBook.id;

    const [updatedCount] = await bookRepository.update(id, safeBook);

    if (updatedCount === 0) {
      throw new AppError({
        statusCode: 404,
        message: 'Book not found!',
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
