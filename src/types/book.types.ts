import type {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

interface BookModel extends Model<
  InferAttributes<BookModel>,
  InferCreationAttributes<BookModel>
> {
  id: CreationOptional<number>;
  title: string;
  isbn: string;
  publishYear?: string;
  genre?: string;
  authorId?: ForeignKey<number>;

  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

export type { BookModel };
