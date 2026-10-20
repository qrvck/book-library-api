import express from 'express';

import { bookController } from '../controllers/book.controller.ts';
import { bookValidator } from '../middleware/bookValidator.ts';

const bookRouter = express.Router();

bookRouter.get('/', bookController.findAll);
bookRouter.get('/:id', bookController.findById);
bookRouter.post('/', bookValidator.create, bookController.create);
bookRouter.put('/:id', bookValidator.update, bookController.update);
bookRouter.delete('/:id', bookController.delete);

export { bookRouter };
