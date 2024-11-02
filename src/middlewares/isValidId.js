import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { columnId, contactId } = req.params;
  if (!isValidObjectId(contactId || columnId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};
