import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { columnId, userId } = req.params;
  if (!isValidObjectId(userId || columnId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};
