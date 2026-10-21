import type { CreationAttributes } from 'sequelize';

import { bookRepository } from '../repositories/book.repository.ts';
import type { IBookModel } from '../types/book.types.ts';
import { BaseService } from './base.service.ts';

class BookService extends BaseService<IBookModel> {
  async create(book: CreationAttributes<IBookModel>) {
    await this.findById(book.authorId);
    return await this.repository.create(book);
  }
}

const bookService = new BookService(bookRepository);

export { bookService };
