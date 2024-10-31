import { Router } from 'express';
import { supportRequestSchema } from '../validation/supportValidation.js';
import { sendSupportEmailController } from '../controllers/support.js';
import { validateBody } from '../middlewares/validateBody.js';

const supportRouter = Router();

supportRouter.post('/', validateBody(supportRequestSchema), sendSupportEmailController);

export default supportRouter;
