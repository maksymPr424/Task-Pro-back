import { tasksCollection } from '../db/models/tasks.js';

// do not delete - for testing purposes
export const getTaskById = async (
  taskId,
  // boardId = 'default'
) => {
  return await tasksCollection.findOne({
    // boardId,
    _id: taskId,
  });
};

export const getTasksByBoardId = async (userId, boardId) => {
  return await tasksCollection.find({ userId, boardId });
};

export const createTask = async (taskData) => {
  const task = await tasksCollection.create(taskData);
  return task;
};

export const deleteTask = async (
  // boardId,
  taskId,
) => {
  return await tasksCollection.findOneAndDelete({
    // boardId,
    _id: taskId,
  });
};

export const updateTask = async (
  taskId,
  // boardId,
  // userId,
  payload,
  options = {},
) => {
  const rawResult = await tasksCollection.findOneAndUpdate(
    {
      _id: taskId,
      // boardId
    },
    payload,

    { new: true, runValidators: true, ...options },
  );

  return rawResult;

  // return await tasksCollection.findByIdAndUpdate(taskId, payload, {
  //   new: true,
  // });
};
