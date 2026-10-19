import type {
  CreationOptional,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  Identifier,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import type { BookModel } from './book.types.ts';

interface AuthorModel extends Model<
  InferAttributes<AuthorModel>,
  InferCreationAttributes<AuthorModel>
> {
  id: CreationOptional<Identifier>;
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
  createBook: HasManyCreateAssociationMixin<BookModel, 'id' | 'title', 'isbn'>;
}

export type { AuthorModel };
