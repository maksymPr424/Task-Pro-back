import { tasksCollection } from '../db/models/tasks.js';

// do not delete - for testing purposes
export const getTaskById = async (taskId) => {
  return await tasksCollection.findOne({ _id: taskId });
};

export const getTasksByUserId = async (userId) => {
  return await tasksCollection.find({ userId });
};

export const getTasksByBoardId = async (userId, boardId) => {
  return await tasksCollection.find({ userId, boardId });
  // .sort({ columnId: 1 });
  // 1 - If you want to sort in reverse order, use -1 instead of 1
};

export const createTask = async (taskData) => {
  const task = await tasksCollection.create(taskData);
  return task;
};

export const deleteTask = async (taskId, userId) => {
  return await tasksCollection.findOneAndDelete({
    _id: taskId,
    userId,
  });
};

export const updateTask = async (
  taskId,
  userId,
  // columnId,
  updateData,
  options = {},
) => {
  const rawResult = await tasksCollection.findOneAndUpdate(
    {
      _id: taskId,
      userId,
      // columnId,
    },
    updateData,
    { new: true, runValidators: true, ...options },
  );

  return rawResult;

  // return await tasksCollection.findByIdAndUpdate(
  // taskId, boardId, userId, columnId, updateData, {
  //   new: true,
  // });
};
