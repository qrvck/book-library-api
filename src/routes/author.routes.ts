import express from 'express';

import { authorController } from '../controllers/author.controller.ts';
import { authorValidator } from '../middleware/authorValidator.ts';

const authorRouter = express.Router();

authorRouter.get('/', authorController.findAll);
authorRouter.get('/:id', authorController.findById);
authorRouter.post('/', authorValidator.create, authorController.create);
authorRouter.put('/:id', authorValidator.update, authorController.update);
authorRouter.delete('/:id', authorController.delete);

export { authorRouter };
