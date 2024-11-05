import createError from 'http-errors';
import {
  createTask,
  deleteTask,
  deleteTasksByColumnId,
  deleteTasksByBoardId,
  updateTask,
} from '../services/tasks.js';

export const createTaskController = async (req, res) => {
  const userId = req.user._id;
  const { boardId, columnId, ...taskData } = req.body;

  if (!boardId || !columnId) {
    throw createError(400, 'Board ID and Column ID are required');
  }

  const task = await createTask({ userId, boardId, columnId, ...taskData });
  res.status(201).json({ task });
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

  res.status(200).json({ updatedTask });
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

export const deleteTasksByColumnIdController = async (req, res) => {
  const userId = req.user._id;
  const { columnId } = req.params;

  const result = await deleteTasksByColumnId(userId, columnId);

  if (result.deletedCount === 0) {
    throw createError(
      404,
      `No tasks found for column ${columnId} and user ${userId}`,
    );
  }

  res.status(200).json({
    status: 200,
    message: `Successfully deleted ${result.deletedCount} tasks for column ${columnId}`,
  });
};

export const deleteTasksByBoardIdController = async (req, res) => {
  const { boardId } = req.params;
  const userId = req.user._id;

  const result = await deleteTasksByBoardId(userId, boardId);

  if (result.deletedCount === 0) {
    throw createError(
      404,
      `No tasks found for board ${boardId} and user ${userId}`,
    );
  }

  res.status(200).json({
    status: 200,
    message: `Successfully deleted ${result.deletedCount} tasks for board ${boardId}`,
  });
};
