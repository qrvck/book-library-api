import type { Identifier } from 'sequelize';

import { AppError } from '../lib/classes.ts';
import { authorRepository } from '../repositories/author.repository.ts';
import type { IAuthorModel } from '../types/author.types.ts';
import { BaseService } from './base.service.ts';

class AuthorService extends BaseService<IAuthorModel> {
  async delete(id: Identifier) {
    const author = await this.findById(id);
    const count = await author.countBooks();

    if (count) {
      throw new AppError({
        statusCode: 409,
        message: 'Cannot delete author with existing books!',
      });
    }

    return await this.repository.delete(id);
  }
}

const authorService = new AuthorService(authorRepository);

export { authorService };
