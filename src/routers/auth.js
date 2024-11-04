import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  currentUserController,
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.js';
import { loginUserSchema, registrationUserSchema } from '../validation/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();
router.post(
  '/register',
  ctrlWrapper(registerUserController),
  validateBody(registrationUserSchema),
);
router.post(
  '/login',
  ctrlWrapper(loginUserController),
  validateBody(loginUserSchema),
);
router.post('/logout', ctrlWrapper(logoutUserController));
router.post('/refresh', ctrlWrapper(refreshUserSessionController));
router.get('/current', ctrlWrapper(currentUserController));
export default router;
