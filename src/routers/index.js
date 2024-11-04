import { Router } from 'express';
import userRouter from './user.js';

import supportRouter from './support.js';
import authRouter from './auth.js';
import tasksRouter from './tasks.js';
import boardRouter from './board.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/board', boardRouter);
router.use('/tasks', tasksRouter);
router.use('/support', supportRouter);

export default router;
