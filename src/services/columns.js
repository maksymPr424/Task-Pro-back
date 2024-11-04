import { ColumnsCollection } from '../db/models/column.js';
// import { deleteTask } from './tasks.js';

export const createColumn = (newColumn) => ColumnsCollection.create(newColumn);

export const deleteColumn = (columnId) =>
  ColumnsCollection.findOneAndDelete({
    _id: columnId,
  });

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

export const getColumnsByBoardId = async (userId, boardId) => {
  return await ColumnsCollection.find({ userId, boardId });
};
