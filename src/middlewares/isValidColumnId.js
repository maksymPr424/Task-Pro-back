import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidСolumnId = (req, res, next) => {
  const { columnId } = req.params;
  if (!isValidObjectId(columnId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};
