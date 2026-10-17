import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Identifier,
  Model,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from "sequelize";
import type { BaseQueries } from "./base.types.ts";
import type { BookModel } from "./book.types.ts";

interface AuthorModel extends Model<
  InferAttributes<AuthorModel>,
  InferCreationAttributes<AuthorModel>
> {
  id: Identifier;
  firstName: string;
  lastName: string;
  biography?: string;
  birthYear?: number;

  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;

  // добавляем типизацию для вызова: Author.hasMany(Book);
  getBooks: HasManyGetAssociationsMixin<BookModel>;
  addBook: HasManyAddAssociationMixin<BookModel, number>;
  addBooks: HasManyAddAssociationsMixin<BookModel, number>;
  setBooks: HasManySetAssociationsMixin<BookModel, number>;
  removeBook: HasManyRemoveAssociationMixin<BookModel, number>;
  removeBooks: HasManyRemoveAssociationsMixin<BookModel, number>;
  hasBook: HasManyHasAssociationMixin<BookModel, number>;
  hasBooks: HasManyHasAssociationsMixin<BookModel, number>;
  countBooks: HasManyCountAssociationsMixin;
  createBook: HasManyCreateAssociationMixin<BookModel, "id" | 'title', "isbn">;
}

interface AuthorQueries extends BaseQueries {}

interface AuthorParams {
  id: Identifier;
}

export type { AuthorModel, AuthorQueries, AuthorParams };
