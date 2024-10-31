import { Router } from 'express';
import tasksRouter from './tasks.js';
// import authRouter from './auth.js';

const router = Router();
router.use('/tasks', tasksRouter);
// router.use('/auth', authRouter);
export default router;
