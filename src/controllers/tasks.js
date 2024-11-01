import createError from 'http-errors';
import {
  getTasksByBoardId,
  getTaskById, // for testing purp.
  createTask,
  deleteTask,
  updateTask,
} from '../services/tasks.js';

// do not delete - for testing purposes (для получения одной задачи по ID задачи и ID доски)
export const getOneTaskController = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await getTaskById(taskId);

    if (!task) {
      return next(createError(404, 'Task not found'));
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const getTasksByBoardIdController = async (req, res, next) => {
  try {
    const userId = req.user._id; // Get user ID from token
    // const boardId = req.board._id;
    const { boardId } = req.query;

    if (!boardId) {
      return next(createError(400, 'Board ID is required'));
    }

    const tasks = await getTasksByBoardId(userId, boardId);
    res.json({
      status: 200,
      message: 'Successfully found tasks of this board!',
      data: tasks,
    });
  } catch (err) {
    next(err);
  }
};

export const createTaskController = async (req, res, next) => {
  const { title, content, priority, deadline } = req.body;

  if (!title || !deadline) {
    throw createError(400, 'Missing some of required fields: title, deadline');
  }

  const task = await createTask({
    title,
    content,
    priority,
    deadline,
    userId: req.user._id,
    boardId: req.body.boardId,
    columnId: req.body.columnId,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a Task!',
    data: task,
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
