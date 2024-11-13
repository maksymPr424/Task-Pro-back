import createHttpError from 'http-errors';
import { verifyEmailEmailable } from '../services/emailVerification.js';

const validateEmailWithEmailable = async (req, res, next) => {
  const { userEmail } = req.body;

  try {
    await verifyEmailEmailable(userEmail);
    next();
  } catch {
    next(createHttpError(422, 'Invalid or non-existent email address'));
  }
};

export default validateEmailWithEmailable;
