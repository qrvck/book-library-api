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

import type { IBookModel } from './book.types.ts';

interface IAuthorModel extends Model<
  InferAttributes<IAuthorModel>,
  InferCreationAttributes<IAuthorModel>
> {
  id: CreationOptional<Identifier>;
  firstName: string;
  lastName: string;
  biography?: string;
  birthYear?: number;

  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;

  // добавляем типизацию для вызова: Author.hasMany(Book);
  getBooks: HasManyGetAssociationsMixin<IBookModel>;
  addBook: HasManyAddAssociationMixin<IBookModel, number>;
  addBooks: HasManyAddAssociationsMixin<IBookModel, number>;
  setBooks: HasManySetAssociationsMixin<IBookModel, number>;
  removeBook: HasManyRemoveAssociationMixin<IBookModel, number>;
  removeBooks: HasManyRemoveAssociationsMixin<IBookModel, number>;
  hasBook: HasManyHasAssociationMixin<IBookModel, number>;
  hasBooks: HasManyHasAssociationsMixin<IBookModel, number>;
  countBooks: HasManyCountAssociationsMixin;
  createBook: HasManyCreateAssociationMixin<IBookModel, 'id' | 'title', 'isbn'>;
}

export type { IAuthorModel };
