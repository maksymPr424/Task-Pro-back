import { sendSupportEmail } from '../services/support.js';

export const sendSupportEmailController = async (req, res, next) => {
  const { userEmail, comment } = req.body;
  await sendSupportEmail(userEmail, comment);
  res.status(200).json({ message: 'Support request sent successfully' });
};
