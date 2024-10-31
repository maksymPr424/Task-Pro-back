import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import * as userControllers from '../controllers/user.js';
import * as userSchemas from '../validation/user-schemas.js';
// import { authenticate } from '../middlewares/authenticate.js';
// import { isValidId } from '../middlewares/isValidId.js';
import upload from '../middlewares/uploadIntoTempDir.js';
const userRouter = Router();

// userRouter.use('/', authenticate);
// userRouter.use('/:userId', isValidId('userId'));
userRouter.patch(
  '/:userId',
  upload.single('photo'),
  validateBody(userSchemas.userUpdateValidationSchema),
  ctrlWrapper(userControllers.updateUserController),
);

export default userRouter;
