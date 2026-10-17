import type { Attributes, CreationAttributes, Identifier } from "sequelize";
import { authorRepository } from "../repositories/author.repository.ts";
import type { AuthorModel, AuthorQueries } from "../types/author.types.ts";
import { AppError } from "../lib/classes.ts";
import { getOffset } from "../lib/utils.ts";

class AuthorService {
  async findAll(queries: AuthorQueries) {
    const { page = 1, size: limit = 100 } = queries;
    const offset = getOffset(page, limit);

    return await authorRepository.findAll({
      offset,
      limit,
    });
  }

  async findById(id: Identifier) {
    const author = await authorRepository.findById(id);

    if (!author) {
      throw new AppError({
        statusCode: 404,
        message: "Author not found!",
      });
    }

    return author;
  }

  async create(author: CreationAttributes<AuthorModel>) {
    return await authorRepository.create(author);
  }

  async update(id: Identifier, data: Partial<Attributes<AuthorModel>>) {
    const [updatedCount] = await authorRepository.update(id, data);

    if (updatedCount === 0) {
      throw new AppError({
        statusCode: 404,
        message: "Author not found!",
      });
    }

    return await this.findById(id);
  }

  async delete(id: Identifier) {
    const author = await this.findById(id);
    const count = await author.countBooks();

    if (count) {
      throw new AppError({
        statusCode: 409,
        message: "Cannot delete author with existing books!",
      });
    }

    return await author.destroy();
  }
}

const authorService = new AuthorService();

export { authorService };
