import { tasksCollection } from '../db/models/tasks.js';

// // do not delete - for testing purposes
export const getTaskById = (taskId) => tasksCollection.findOne({ _id: taskId });

// // do not delete - for testing purposes
export const getTasksByUserId = (userId) => tasksCollection.find({ userId });

// // 1 - If you want to sort in reverse order, use .sort({ columnId: -1 })
export const getTasksByBoardId = (userId, boardId) =>
  tasksCollection.find({ userId, boardId }).sort({ columnId: 1 });

export const getTasksByColumnId = (userId, columnId) =>
  tasksCollection.find({ userId, columnId });

export const createTask = (taskData) => tasksCollection.create(taskData);

export const updateTask = (taskId, userId, updateData, options = {}) =>
  tasksCollection.findOneAndUpdate({ _id: taskId, userId }, updateData, {
    new: true,
    runValidators: true,
    ...options,
  });

export const deleteTask = (taskId, userId) =>
  tasksCollection.findOneAndDelete({ _id: taskId, userId });

export const deleteTasksByColumnId = (userId, columnId) =>
  tasksCollection.deleteMany({ userId, columnId });

export const deleteTasksByBoardId = (userId, boardId) =>
  tasksCollection.deleteMany({ userId, boardId });
