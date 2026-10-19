import { DataTypes } from 'sequelize';

import { sequelize } from '../config/database.ts';
import type { AuthorModel } from '../types/author.types.ts';

const Author = sequelize.define<AuthorModel>('author', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  biography: {
    type: DataTypes.TEXT,
  },

  birthYear: {
    type: DataTypes.INTEGER,
  },

  createdAt: {
    type: DataTypes.DATE,
  },

  updatedAt: {
    type: DataTypes.DATE,
  },
});

// Author.hasMany(Book);

export { Author };
