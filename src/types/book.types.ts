import type {
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  CreationOptional,
  ForeignKey,
  Identifier,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import type { AuthorModel } from './author.types.ts';
import type { BaseQueries } from './base.types.ts';

interface BookModel extends Model<InferAttributes<BookModel>, InferCreationAttributes<BookModel>> {
  id: CreationOptional<Identifier>;
  title: string;
  isbn: string;
  publishYear?: string;
  genre?: string;
  authorId: ForeignKey<Identifier>;

  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;

  // добавляем типизацию для вызова: Book.belongsTo(Author);
  getAuthor: BelongsToGetAssociationMixin<AuthorModel>;
  setAuthor: BelongsToSetAssociationMixin<AuthorModel, AuthorModel['id']>;
  createAuthor: BelongsToCreateAssociationMixin<AuthorModel>;
}

interface BookQueries extends BaseQueries {
  genre?: string;
  authorId?: number;
}

export type { BookModel, BookQueries };
