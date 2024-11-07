import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createColumnController,
  deleteColumnController,
  patchColumnController,
} from '../controllers/columns.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createColumnSchema } from '../validation/columns.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidСolumnId } from '../middlewares/isValidColumnId.js';

const router = Router();
router.use(authenticate);


router.post(
  '/',
  validateBody(createColumnSchema),
  ctrlWrapper(createColumnController),
);

router.delete(
  '/:columnId',
  isValidСolumnId,
  ctrlWrapper(deleteColumnController),
);

router.patch(
  '/:columnId',
  isValidСolumnId,
  validateBody(createColumnSchema),
  ctrlWrapper(patchColumnController),
);

export default router;
