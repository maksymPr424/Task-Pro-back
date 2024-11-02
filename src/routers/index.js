import { Router } from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import columnsRouter from './columns.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/columns', columnsRouter);

export default router;
