import { DataTypes } from "sequelize";
import { sequelize } from "../app.ts";

const Book = sequelize.define("book", {
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
});

export { Book };
