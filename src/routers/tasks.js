import { Router } from 'express';

import {
  createTaskController,
  patchTaskController,
  deleteTaskController,
} from '../controllers/tasks.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createTaskSchema, updateTaskSchema } from '../validation/tasks.js';
import { isValidTaskId } from '../middlewares/isValidTaskId.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

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

export default router;
