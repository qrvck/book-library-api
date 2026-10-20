import 'dotenv/config';

import express from 'express';

import { sequelize } from './config/database.ts';
import { errorHandler } from './middleware/errorHandler.ts';
import { Author } from './models/author.model.ts';
import { Book } from './models/book.model.ts';
import { authorRouter } from './routes/author.routes.ts';
import { bookRouter } from './routes/book.routes.ts';

const HOST = process.env.HOST;
const PORT = Number(process.env.PORT);

if (!HOST || !PORT) {
  throw new Error('Express environment variables are not set!');
}

const app = express();

Author.hasMany(Book);
Book.belongsTo(Author);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.use('/api/authors', authorRouter);
app.use('/api/books', bookRouter);
app.use(errorHandler);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, HOST, function () {
      console.log(`Server listens http://${HOST}:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
