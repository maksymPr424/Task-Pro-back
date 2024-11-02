import { ColumnsCollection } from '../db/models/column.js';
import { tasksCollection } from '../db/models/tasks.js';

export const createColumn = async (payload) => {
  const column = await ColumnsCollection.create(payload);
  return column;
};

export const deleteColumn = async (columnId) => {
  const column =
    (await ColumnsCollection.findOneAndDelete({
      _id: columnId,
    })) && (await tasksCollection.findOneAndDelete({ columnId }));
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
