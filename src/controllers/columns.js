import createHttpError from 'http-errors';
import {
  createColumn,
  deleteColumn,
  updateColumn,
} from '../services/columns.js';

export const createColumnController = async (req, res) => {
  const column = await createColumn(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a column!`,
    data: column,
  });
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

  res.json({
    status: 200,
    message: `Successfully patched a column!`,
    data: result.column,
  });
};
