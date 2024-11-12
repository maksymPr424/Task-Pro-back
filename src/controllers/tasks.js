import createError from 'http-errors';
import { createTask, deleteTask, updateTask } from '../services/tasks.js';

export const createTaskController = async (req, res) => {
  const userId = req.user._id;
  const { boardId, columnId } = req.body;

  if (!boardId || !columnId) {
    throw createError(400, 'Board ID and Column ID are required');
  }
  const task = await createTask({ userId, ...req.body });
  res.status(201).json(task);
};

export const patchTaskController = async (req, res) => {
  const userId = req.user._id;
  const taskId = req.params.taskId;
  const updateData = req.body;

  if (updateData.boardId) {
    throw createError(400, 'Modifying boardId is not allowed');
  }

  const updatedTask = await updateTask(taskId, userId, updateData);

  if (!updatedTask) {
    throw createError(404, 'Task not found');
  }

  res.status(200).json(updatedTask);
};

export const deleteTaskController = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user._id;

  const task = await deleteTask(taskId, userId);

  if (!task) {
    throw createError(404, 'Task not found');
  }

  res.status(204).send();
};
