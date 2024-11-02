import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createColumnController,
  deleteColumnController,
  patchColumnController,
} from '../controllers/columns.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createColumnSchema } from '../validation/columns.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.post(
  '/columns',
  validateBody(createColumnSchema),
  ctrlWrapper(createColumnController),
);

router.delete(
  '/columns/:columnId',
  isValidId,
  ctrlWrapper(deleteColumnController),
);

router.patch(
  '/columns/:columnId',
  isValidId,
  validateBody(createColumnSchema),
  ctrlWrapper(patchColumnController),
);

export default router;
