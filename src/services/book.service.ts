import type { CreationAttributes } from 'sequelize';

import { bookRepository } from '../repositories/book.repository.ts';
import type { BookModel } from '../types/book.types.ts';
import { BaseService } from './base.service.ts';

class BookService extends BaseService<BookModel> {
  async create(book: CreationAttributes<BookModel>) {
    await this.findById(book.authorId);
    return await this.repository.create(book);
  }
}

const bookService = new BookService(bookRepository);

export { bookService };
