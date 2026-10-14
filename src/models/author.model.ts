import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.ts";

const Author = sequelize.define("author", {
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
});

// Author.hasMany(Book);

export { Author };
