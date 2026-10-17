import type {
  Attributes,
  CreationAttributes,
  FindOptions,
  Identifier,
  InferAttributes,
} from "sequelize";
import { Author } from "../models/author.model.ts";
import type { AuthorModel } from "../types/author.types.ts";

class AuthorRepository {
  async findAll(options: FindOptions<InferAttributes<AuthorModel>>) {
    return await Author.findAll(options);
  }

  async findById(id: Identifier) {
    return await Author.findByPk(id);
  }

  async create(author: CreationAttributes<AuthorModel>) {
    return await Author.create(author);
  }

  async update(id: Identifier, author: Partial<Attributes<AuthorModel>>) {
    return await Author.update(author, {
      where: { id },
      fields: ["biography", "birthYear", "firstName", "lastName"],
      limit: 1,
    });
  }

  async delete(id: Identifier) {
    return await Author.destroy({
      where: { id },
      limit: 1,
    });
  }
}

const authorRepository = new AuthorRepository();

export { authorRepository };
