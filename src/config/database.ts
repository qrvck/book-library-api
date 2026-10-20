import { Sequelize } from 'sequelize';

const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;

if (!POSTGRES_DB || !POSTGRES_USER || !POSTGRES_PASSWORD) {
  throw new Error('PostgreSQL environment variables are not set!');
}

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  dialect: 'postgres',
});

export { sequelize };
