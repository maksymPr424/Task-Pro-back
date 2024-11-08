import { ColumnsCollection } from '../db/models/column.js';
import {
  deleteTasksByBoardId,
  deleteTasksByColumnId,
  getTasksByColumnId,
} from './tasks.js';

export const createColumn = (userId, newColumn) =>
  ColumnsCollection.create({ userId, ...newColumn });

export const deleteColumn = async (userId, columnId) => {
  const column = await ColumnsCollection.findOneAndDelete({
    _id: columnId,
    userId,
  });

  await deleteTasksByColumnId(userId, columnId);

  return column;
};

export const deleteColumns = async (userId, boardId) => {
  await deleteTasksByBoardId(userId, boardId);
  await ColumnsCollection.deleteMany({ userId, boardId });
};

export const updateColumn = async (columnId, payload, options = {}) => {
  const rawResult = await ColumnsCollection.findOneAndUpdate(
    { _id: columnId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    column: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const getBoardColumnsWithTasks = async (userId, boardId) => {
  const columns = await ColumnsCollection.find({ boardId });

  if (!columns.length) return [];

  const columnsWithTasks = await Promise.all(
    columns.map(async ({ _id, title }) => {
      const tasks = await getTasksByColumnId(_id);
      console.log(title);

      return {
        title,
        id: _id,
        tasks,
      };
    }),
  );

  return columnsWithTasks;
};
