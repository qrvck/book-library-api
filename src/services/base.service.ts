import type { Attributes, CreationAttributes, FindOptions, Identifier, Model } from 'sequelize';

import { AppError } from '../lib/classes.ts';
import type { IBaseRepository } from '../types/base.types.ts';

export abstract class BaseService<T extends Model> {
  protected readonly repository: IBaseRepository<T>;

  constructor(repository: IBaseRepository<T>) {
    this.repository = repository;
  }

  async findAll(options: FindOptions<Attributes<T>>): Promise<T[]> {
    return this.repository.findAll(options);
  }

  async findById(id: Identifier): Promise<T> {
    const entity = await this.repository.findById(id);

    if (!entity) {
      throw new AppError({
        statusCode: 404,
        message: 'Entity not found!',
      });
    }

    return entity;
  }

  async create(data: CreationAttributes<T>): Promise<T> {
    return this.repository.create(data);
  }

  async update(id: Identifier, data: Partial<T>): Promise<T> {
    const [updatedCount] = await this.repository.update(id, data);

    if (updatedCount === 0) {
      throw new AppError({
        statusCode: 404,
        message: 'Entity not found!',
      });
    }

    return await this.findById(id);
  }

  async delete(id: Identifier): Promise<number> {
    await this.findById(id);
    return this.repository.delete(id);
  }
}
