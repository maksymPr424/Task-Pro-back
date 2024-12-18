import { tasksCollection } from '../db/models/tasks.js';

export const createTask = (taskData) => tasksCollection.create(taskData);

export const getTasksByColumnId = (columnId) =>
  tasksCollection.find({ columnId });

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
