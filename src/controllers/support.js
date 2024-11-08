import { sendSupportEmail } from '../services/support.js';
import { verifyEmailEmailable } from '../services/emailVerification.js';

export const sendSupportEmailController = async (req, res, next) => {
  const { userEmail, comment } = req.body;
  try {
    const verificationResponse = await verifyEmailEmailable(userEmail);

    if (verificationResponse.state === 'deliverable') {
      await sendSupportEmail(userEmail, comment);
      res.status(200).json({ message: 'Support request sent successfully' });
    } else {
      res.status(400).json({ message: 'Invalid email address' });
    }
  } catch (error) {
    next(error);
  }
};
