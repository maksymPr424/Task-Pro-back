import { Router } from 'express';

import {
  getOneTaskController, // for testing purposes
  getTasksByBoardIdController,
  createTaskController,
  deleteTaskController,
  patchTaskController,
} from '../controllers/tasks.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createTaskSchema, updateTaskSchema } from '../validation/tasks.js';
import { isValidId } from '../middlewares/isValidTaskId.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

// for testing purposes
router.get('/:taskId', isValidId, ctrlWrapper(getOneTaskController));

router.get(
  '/',
  authenticate,
  // findBoardById,
  ctrlWrapper(getTasksByBoardIdController),
);

router.delete('/:taskId', isValidId, ctrlWrapper(deleteTaskController));

router.post(
  '/',
  validateBody(createTaskSchema),
  ctrlWrapper(createTaskController),
);

router.patch(
  '/:taskId',
  isValidId,
  validateBody(updateTaskSchema),
  ctrlWrapper(patchTaskController),
);

export default router;
