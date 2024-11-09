import { Router } from 'express';
import userRouter from './user.js';
import backgroundRouter from './background.js';
import supportRouter from './support.js';
import authRouter from './auth.js';
import tasksRouter from './tasks.js';
import columnsRouter from './columns.js';
import boardRouter from './board.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/columns', columnsRouter);
router.use('/board', boardRouter);
router.use('/tasks', tasksRouter);
router.use('/support', supportRouter);
router.use('/background', backgroundRouter);
export default router;
