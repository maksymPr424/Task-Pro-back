import createHttpError from 'http-errors';
import * as userServices from '../services/user.js';
import uploadImage from '../utils/uploadImage.js';
import { env } from '../utils/env.js';
import hashPassword from '../utils/hashPassword.js';
const cloudinaryFolder = env('CLOUDINARY_FOLDER');

export const updateUserController = async (req, res) => {
  if (Object.keys(req.body).length === 0 && !req.file) {
    throw createHttpError(400, 'Empty body received');
  }
  const { body } = req;
  // const userId = req.user._id;
  const userId = req.params.userId;
  const user = await userServices.findUser({
    _id: userId,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const updateData = { ...body };

  if (body.password) {
    updateData.password = await hashPassword(body.password);
  }

  if (req.file) {
    updateData.photoUrl = await uploadImage(
      req.file,
      cloudinaryFolder,
      user.photoUrl,
    );
  }

  const updatedUserRawData = await userServices.updateUser(
    { _id: userId },
    updateData,
  );

  const { name, email, theme, photoUrl } = updatedUserRawData.value;

  res.json({
    status: 200,
    message: 'User profile successfully updated',
    data: { name, email, theme, photoUrl },
  });
};
