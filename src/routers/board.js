import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  addBoardController,
  deleteBoardController,
  getAllBoardsController,
  getBoardByIdController,
  updateBoardController,
} from '../controllers/board.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  addBoardSchema,
  updateBoardSchema,
} from '../validation/board-schemas.js';

const boardRouter = Router();

boardRouter.get('/', authenticate, ctrlWrapper(getAllBoardsController));

boardRouter.get('/:id', authenticate, ctrlWrapper(getBoardByIdController));

boardRouter.post(
  '/',
  authenticate,
  validateBody(addBoardSchema),
  ctrlWrapper(addBoardController),
);
boardRouter.patch(
  '/:id',
  authenticate,
  validateBody(updateBoardSchema),
  ctrlWrapper(updateBoardController),
);

boardRouter.delete('/:id', authenticate, ctrlWrapper(deleteBoardController));

export default boardRouter;
