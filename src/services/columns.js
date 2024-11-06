import { ColumnsCollection } from '../db/models/column.js';
import { tasksCollection } from '../db/models/tasks.js';

export const createColumn = (newColumn) => ColumnsCollection.create(newColumn);

export const deleteColumn = async (columnId) => {
  const column = await ColumnsCollection.findOneAndDelete({
    _id: columnId,
  });

  await tasksCollection.deleteMany({ columnId });

  return column;
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
  const columns = await ColumnsCollection.find({ userId, boardId });

  if (!columns.length) return [];

  const columnsIdList = columns.map((column) => column._id);
  const tasks = await tasksCollection.find({
    columnId: { $in: columnsIdList },
  });

  return columns.map((column) => {
    const columnWithTasks = column.toObject();
    columnWithTasks.tasks = tasks.filter((task) =>
      task.columnId.equals(column._id),
    );

    return columnWithTasks;
  });
};
