import type { Attributes, CreationAttributes, FindOptions, Identifier, Model } from 'sequelize';

interface IBaseRepository<T extends Model> {
  findAll(options?: FindOptions<Attributes<T>>): Promise<T[]>;
  findById(id: Identifier): Promise<T | null>;
  create(data: CreationAttributes<T>): Promise<T>;
  update(id: Identifier, data: Partial<T>): Promise<[affectedCount: number]>;
  delete(id: Identifier): Promise<number>;
}

interface IBaseQueries {
  page?: string;
  size?: string;
}

interface IBaseParams {
  id: Identifier;
}

export type { IBaseParams, IBaseQueries, IBaseRepository };
