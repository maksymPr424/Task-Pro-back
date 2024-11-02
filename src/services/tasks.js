import { tasksCollection } from '../db/models/tasks.js';

// do not delete - for testing purposes
export const getTaskById = async (taskId) => {
  return await tasksCollection.findOne({ _id: taskId });
};

export const getTasksByBoardId = async (userId, boardId) => {
  return await tasksCollection.find({ userId, boardId });
};

export const createTask = async (taskData) => {
  const task = await tasksCollection.create(taskData);
  return task;
};

export const deleteTask = async (
  taskId,
  userId,
  // boardId,
  // columnId
) => {
  return await tasksCollection.findOneAndDelete({
    _id: taskId,
    userId,
    // boardId,
    // columnId,
  });
};

export const updateTask = async (
  taskId,
  // boardId,
  // userId,
  // columnId,
  payload,
  options = {},
) => {
  const rawResult = await tasksCollection.findOneAndUpdate(
    {
      _id: taskId,
      // boardId,
      // userId,
      // columnId,
    },
    payload,

    { new: true, runValidators: true, ...options },
  );

  return rawResult;

  // return await tasksCollection.findByIdAndUpdate(taskId, payload, {
  //   new: true,
  // });
};
