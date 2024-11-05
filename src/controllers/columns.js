import createHttpError from 'http-errors';
import {
  createColumn,
  deleteColumn,
  updateColumn,
} from '../services/columns.js';

export const createColumnController = async (req, res) => {
  const column = await createColumn(req.body);

  res.status(201).json({ column });
};

export const deleteColumnController = async (req, res, next) => {
  const { columnId } = req.params;

  const column = await deleteColumn(columnId);

  if (!column) {
    next(createHttpError(404, 'Column not found'));
    return;
  }
  res.status(204).send();
};

export const patchColumnController = async (req, res, next) => {
  const { columnId } = req.params;
  const result = await updateColumn(columnId, req.body);

  if (!result) {
    next(createHttpError(404, 'Column not found'));
    return;
  }

  res.status(200).json(result.column);
};
