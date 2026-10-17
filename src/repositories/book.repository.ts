import type {
  Attributes,
  CreationAttributes,
  FindOptions,
  Identifier,
  InferAttributes,
} from "sequelize";
import { Book } from "../models/book.model.ts";
import type { BookModel } from "../types/book.types.ts";
import { Author } from "../models/author.model.ts";

class BookRepository {
  async findAll(options: FindOptions<InferAttributes<BookModel>>) {
    return await Book.findAll(options);
  }

  async findById(id: Identifier) {
    return await Book.findByPk(id, {
      include: Author,
    });
  }

  async create(book: CreationAttributes<BookModel>) {
    return await Book.create(book);
  }

  async update(id: Identifier, book: Partial<Attributes<BookModel>>) {
    return await Book.update(book, {
      where: { id },
      fields: ["genre", "isbn", "publishYear", "title"],
      limit: 1,
    });
  }

  async delete(id: Identifier) {
    return await Book.destroy({
      where: { id },
      limit: 1,
    });
  }
}

const bookRepository = new BookRepository();

export { bookRepository };
