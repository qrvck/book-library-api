import express from 'express';

import { authorController } from '../controllers/author.controller.ts';

const authorRouter = express.Router();

authorRouter.get('/', authorController.findAll);
authorRouter.get('/:id', authorController.findById);
authorRouter.post('/', authorController.create);
authorRouter.put('/:id', authorController.update);
authorRouter.delete('/:id', authorController.delete);

export { authorRouter };
