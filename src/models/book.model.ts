import { DataTypes } from 'sequelize';

import { sequelize } from '../config/database.ts';
import type { IBookModel } from '../types/book.types.ts';

const Book = sequelize.define<IBookModel>('book', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  publishYear: {
    type: DataTypes.INTEGER,
  },

  genre: {
    type: DataTypes.STRING,
  },

  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  createdAt: {
    type: DataTypes.DATE,
  },

  updatedAt: {
    type: DataTypes.DATE,
  },
});

// Book.belongsTo(Author);

export { Book };
