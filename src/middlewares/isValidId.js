import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidСolumnId = (req, res, next) => {
  const { columnId } = req.params;
  if (!isValidObjectId(columnId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};
