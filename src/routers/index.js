import { Router } from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import boardRouter from './board.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/board', boardRouter);

export default router;
