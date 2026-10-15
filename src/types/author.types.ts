import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

interface AuthorModel extends Model<
  InferAttributes<AuthorModel>,
  InferCreationAttributes<AuthorModel>
> {
  id: CreationOptional<number>;
  firstName: string;
  lastName: string;
  biography?: string;
  birthYear?: number;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
}

export type { AuthorModel };
