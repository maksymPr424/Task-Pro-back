import createHttpError from 'http-errors';
import { verifyEmailEmailable } from '../services/emailVerification.js';

const validateEmailWithEmailable = async (req, res, next) => {
  const { userEmail } = req.body;

  try {
    const verificationResponse = await verifyEmailEmailable(userEmail);

    if (verificationResponse.state === 'deliverable') {
      next();
    } else {
      return next(
        new createHttpError(422, 'Invalid or non-existent email address'),
      );
    }
  } catch (error) {
    console.error('Error verifying email address with Emailable:', error);
    return next(new createHttpError(500, 'Error verifying email address'));
  }
};

export default validateEmailWithEmailable;
