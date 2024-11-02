import { Router } from 'express';
import userRouter from './user.js';
import authRouter from './auth.js';
import tasksRouter from './tasks.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/tasks', tasksRouter);

export default router;
