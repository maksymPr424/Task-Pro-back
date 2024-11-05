import { Router } from 'express';

import supportRouter from './support.js';
import authRouter from './auth.js';
import userRouter from './user.js';
import columnsRouter from './columns.js';
import boardRouter from './board.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/columns', columnsRouter);
router.use('/board', boardRouter);
router.use('/support', supportRouter);

export default router;
