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

boardRouter.use(authenticate);

boardRouter.get('/', ctrlWrapper(getAllBoardsController));

boardRouter.get('/:id', ctrlWrapper(getBoardByIdController));

boardRouter.post(
  '/',
  validateBody(addBoardSchema),
  ctrlWrapper(addBoardController),
);
boardRouter.patch(
  '/:id',
  validateBody(updateBoardSchema),
  ctrlWrapper(updateBoardController),
);

boardRouter.delete('/:id', ctrlWrapper(deleteBoardController));

export default boardRouter;
