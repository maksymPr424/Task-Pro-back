import createError from 'http-errors';
import {
  getTasksByBoardId,
  getTaskById, // for testing purp.
  createTask,
  deleteTask,
  updateTask,
} from '../services/tasks.js';

// do not delete - for testing purposes (для получения одной задачи по ID задачи и ID доски)
export const getTaskController = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await getTaskById(taskId, req.user._id);

    if (!task) {
      return next(createError(404, 'Task not found'));
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const getBoardTasksController = async (req, res, next) => {
  try {
    const { boardId } = req.query;
    const tasks = await getTasksByBoardId(boardId);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const createTaskController = async (req, res, next) => {
  const { title, content, labelColor, priority, deadline, column } = req.body;

  if (!title || !column || !deadline) {
    throw createError(
      400,
      'Missing some of required fields: title, column, deadline',
    );
  }

  const Task = await createTask({
    title,
    content,
    labelColor,
    priority,
    deadline,
    column,
    // boardId: req.board._id,
  });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a Task!',
    data: Task,
  });
};

export const deleteTaskController = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await deleteTask(taskId, req.user._id);

    if (!task) {
      return next(createError(404, 'Task not found'));
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const patchTaskController = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const updatedTask = await updateTask(taskId, req.body);

    if (!updatedTask) {
      return next(createError(404, 'Task not found'));
    }

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};
