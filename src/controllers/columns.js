import createHttpError from 'http-errors';
import {
  createColumn,
  deleteColumn,
  updateColumn,
} from '../services/columns.js';


export const createColumnController = async (req, res) => {
  const userId = req.user._id;
  const column = await createColumn(userId, req.body);


  res.status(201).json({ column });
};

export const deleteColumnController = async (req, res, next) => {
  const { columnId } = req.params;
  const userId = req.user._id;

  const column = await deleteColumn(userId, columnId);

  if (!column) {
    throw createHttpError(404, 'Column not found');
  }
  res.status(204).send();
};

export const patchColumnController = async (req, res, next) => {
  const { columnId } = req.params;
  const result = await updateColumn(columnId, req.body);

  if (!result) {
    throw createHttpError(404, 'Column not found');
  }

  res.status(200).json(result.column);
};
