import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  addBoard,
  deleteBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
} from '../controllers/board.js';
import {
  addBoardSchema,
  updateBoardSchema,
} from '../validation/board-schemas.js';

const boardRouter = Router();

boardRouter
  .get('/', authenticate, ctrlWrapper(getAllBoards))
  .get('/:boardId', authenticate, ctrlWrapper(getBoardById))
  .post('/', authenticate, validateBody(addBoardSchema), ctrlWrapper(addBoard))
  .patch(
    '/:boardId',

    validateBody(updateBoardSchema),
    ctrlWrapper(updateBoard),
  )
  .delete('/:boardId', authenticate, ctrlWrapper(deleteBoard));

export default boardRouter;
