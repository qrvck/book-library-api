import type { Attributes, CreationAttributes, Identifier } from "sequelize";
import { authorRepository } from "../repositories/author.repository.ts";
import type {
  AuthorModel,
  AuthorParams,
  AuthorQueries,
} from "../types/author.types.ts";
import { AppError } from "../lib/classes.ts";
import { getOffset } from "../lib/utils.ts";

class AuthorService {
  async findAll(queries: AuthorQueries) {
    const { page = 1, size = 100 } = queries;
    const offset = getOffset(page, size);

    const findOptions = {
      offset,
      limit: size,
    };

    return await authorRepository.findAll(findOptions);
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
    try {
      return await authorRepository.create(author);
    } catch (error) {
      throw new AppError({
        statusCode: 400,
        message:
          error instanceof Error
            ? error.message
            : "Error while creating an author!",
      });
    }
  }

  async update(id: Identifier, data: Partial<Attributes<AuthorModel>>) {
    try {
      const [updatedCount] = await authorRepository.update(id, data);

      if (updatedCount === 0) {
        throw new AppError({
          statusCode: 404,
          message: "Author not found!",
        });
      }
      await authorRepository.update(id, data);
      return await this.findById(id);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError({
        statusCode: 400,
        message:
          error instanceof Error
            ? error.message
            : "Error while updating an author!",
      });
    }
  }

  async delete(id: Identifier) {
    const author = await this.findById(id);

    try {
      const count = await author.countBooks();

      if (count) {
        throw new AppError({
          statusCode: 409,
          message: "Cannot delete author with existing books!",
        });
      }

      return await author.destroy();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError({
        statusCode: 400,
        message:
          error instanceof Error
            ? error.message
            : "Error while deleting an author!",
      });
    }
  }
}

const authorService = new AuthorService();

export { authorService };
