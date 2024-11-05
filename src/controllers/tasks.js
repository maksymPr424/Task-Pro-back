import createError from 'http-errors';
import {
  getTasksByUserId, // for testing purp.
  getTaskById, // for testing purp.
  getTasksByBoardId,
  createTask,
  deleteTask,
  deleteTasksByColumnId,
  deleteTasksByBoardId,
  updateTask,
} from '../services/tasks.js';

// -- do not delete - for testing purposes
export const getOneTaskController = async (req, res, next) => {
  const { taskId } = req.params;
  const task = await getTaskById(taskId);

  if (!task) {
    throw createError(404, 'Task not found');
  }

  res.json(task);
};

// -- do not delete - for testing purposes
export const getTasksByUserIdController = async (req, res) => {
  const userId = req.user._id;
  const tasks = await getTasksByUserId(userId);

  res.json({
    status: 200,
    message: 'Successfully found tasks of this user!',
    data: tasks,
  });
};

export const getTasksByBoardIdController = async (req, res, next) => {
  const userId = req.user._id;

  // if boardId taken only from params, an arror occures during Postman tests
  // const boardId = req.params.boardId;
  const boardId = req.query.boardId || req.params.boardId;

  if (!boardId) {
    return next(createError(400, 'Board ID is required'));
  }

  const tasks = await getTasksByBoardId(userId, boardId);

  if (tasks.length === 0) {
    return next(
      createError(
        404,
        `No tasks found for board ${boardId} and user ${userId}`,
      ),
    );
  }

  res.status(200).json({ tasks });
  // .json({
  //   status: 200,
  //   message: 'Successfully found tasks of this board!',
  //   data: tasks,
  // });
};

export const createTaskController = async (req, res, next) => {
  const userId = req.user._id;
  const { boardId, columnId, ...taskData } = req.body;

  if (!boardId || !columnId) {
    return next(createError(400, 'Board ID and Column ID are required'));
  }

  const task = await createTask({ userId, boardId, columnId, ...taskData });
  res.status(201).json({ task });
};

export const patchTaskController = async (req, res, next) => {
  const userId = req.user._id;
  const taskId = req.params.taskId;
  const updateData = req.body;

  if (updateData.boardId) {
    return next(createError(400, 'Modifying boardId is not allowed'));
  }

  const updatedTask = await updateTask(taskId, userId, updateData);

  if (!updatedTask) {
    return next(createError(404, 'Task not found'));
  }

  res.status(200).json({ updatedTask });
};

export const deleteTaskController = async (req, res, next) => {
  const { taskId } = req.params;
  const task = await deleteTask(taskId, req.user._id);

  if (!task) {
    return next(createError(404, 'Task not found'));
  }

  res.status(204).send();
};

export const deleteTasksByColumnIdController = async (req, res, next) => {
  const userId = req.user._id;
  const { columnId } = req.params;

  try {
    const result = await deleteTasksByColumnId(userId, columnId);

    if (result.deletedCount === 0) {
      return next(
        createError(
          404,
          `No tasks found for column ${columnId} and user ${userId}`,
        ),
      );
    }

    res.status(200).json({
      status: 200,
      message: `Successfully deleted ${result.deletedCount} tasks for column ${columnId}`,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTasksByBoardIdController = async (req, res, next) => {
  const { boardId } = req.params;
  const userId = req.user._id;

  const result = await deleteTasksByBoardId(userId, boardId);

  if (result.deletedCount === 0) {
    return next(
      createError(
        404,
        `No tasks found for board ${boardId} and user ${userId}`,
      ),
    );
  }

  res.status(200).json({
    status: 200,
    message: `Successfully deleted ${result.deletedCount} tasks for board ${boardId}`,
  });
};
