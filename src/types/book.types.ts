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

import type { IAuthorModel } from './author.types.ts';
import type { IBaseQueries } from './base.types.ts';

interface IBookModel extends Model<
  InferAttributes<IBookModel>,
  InferCreationAttributes<IBookModel>
> {
  id: CreationOptional<Identifier>;
  title: string;
  isbn: string;
  publishYear?: string;
  genre?: string;
  authorId: ForeignKey<Identifier>;

  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;

  // добавляем типизацию для вызова: Book.belongsTo(Author);
  getAuthor: BelongsToGetAssociationMixin<IAuthorModel>;
  setAuthor: BelongsToSetAssociationMixin<IAuthorModel, IAuthorModel['id']>;
  createAuthor: BelongsToCreateAssociationMixin<IAuthorModel>;
}

interface IBookQueries extends IBaseQueries {
  genre?: string;
  authorId?: string;
}

export type { IBookModel, IBookQueries };
