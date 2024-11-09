import { authenticate } from '../middlewares/authenticate.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getBackgroundByIdController } from '../controllers/background.js';
const backgroundRouter = Router();
backgroundRouter.get(
  '/:name',
  authenticate,
  ctrlWrapper(getBackgroundByIdController),
);
export default backgroundRouter;
