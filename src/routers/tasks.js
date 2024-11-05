import { Router } from 'express';

import {
  // getOneTaskController, // for testing purposes
  getTasksByUserIdController, // for testing purposes
  getTasksByBoardIdController,
  createTaskController,
  deleteTaskController,
  deleteTasksByColumnIdController,
  deleteTasksByBoardIdController,
  patchTaskController,
} from '../controllers/tasks.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createTaskSchema, updateTaskSchema } from '../validation/tasks.js';
import { isValidTaskId } from '../middlewares/isValidTaskId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { findBoardById } from '../middlewares/boards.js';
// import { logRequestDetails } from '../middlewares/logRequestDetails.js';

const router = Router();

router.use(authenticate);

// router.use(logRequestDetails);

router.get('/all', ctrlWrapper(getTasksByUserIdController));

// for testing purposes
// router.get('/:taskId', isValidTaskId, ctrlWrapper(getOneTaskController));

router.get('/', findBoardById, ctrlWrapper(getTasksByBoardIdController));

router.post(
  '/',
  validateBody(createTaskSchema),
  ctrlWrapper(createTaskController),
);

router.patch(
  '/:taskId',
  isValidTaskId,
  validateBody(updateTaskSchema),
  ctrlWrapper(patchTaskController),
);

router.delete('/:taskId', isValidTaskId, ctrlWrapper(deleteTaskController));

router.delete(
  '/column/:columnId',
  ctrlWrapper(deleteTasksByColumnIdController),
);

router.delete('/board/:boardId', ctrlWrapper(deleteTasksByBoardIdController));

export default router;
