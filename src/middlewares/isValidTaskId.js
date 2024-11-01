import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidTaskId = (req, res, next) => {
  const { taskId } = req.params;
  if (!isValidObjectId(taskId)) {
    throw createHttpError(400, 'Task id is not valid!');
  }

  next();
};
