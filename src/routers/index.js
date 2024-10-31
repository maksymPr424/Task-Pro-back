import { Router } from 'express';
import supportRouter from "./support.js";

const router = Router();
router.use("/support", supportRouter);

export default router;
