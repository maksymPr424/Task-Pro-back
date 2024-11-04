import createError from 'http-errors';
import {
  getTasksByUserId, // for testing purp.
  getTaskById, // for testing purp.
  getTasksByBoardId,
  createTask,
  deleteTask,
  updateTask,
} from '../services/tasks.js';

// -- do not delete - for testing purposes (для получения одной задачи по ID задачи)
export const getOneTaskController = async (req, res, next) => {
  const { taskId } = req.params;
  const task = await getTaskById(taskId);

  if (!task) {
    throw createError(404, 'Task not found');
  }

  res.json(task);
};

export const getTasksByUserIdController = async (req, res) => {
  const userId = req.user._id;
  const tasks = await getTasksByUserId(userId);
  // const { userId } = req.user._id;
  // const tasks = await getTasksByUserId({userId});

  res.json({
    status: 200,
    message: 'Successfully found tasks of this user!',
    data: tasks,
  });
};
// -- end of testing block, delete only on app release --

export const getTasksByBoardIdController = async (req, res, next) => {
  const userId = req.user._id; // Get user ID from token
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

  res.status(200).json({
    status: 200,
    message: 'Successfully found tasks of this board!',
    data: tasks,
  });
};

export const createTaskController = async (req, res, next) => {
  const userId = req.user._id;
  const { boardId, ...taskData } = req.body;

  if (!boardId) {
    return next(createError(400, 'Board ID is required'));
  }

  const task = await createTask({ userId, boardId, ...taskData });
  res.status(201).json({
    status: 201,
    message: 'Task successfully created!',
    data: task,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a Task!',
    data: task,
  });
};

export const deleteTaskController = async (req, res, next) => {
  const { taskId } = req.params;
  const task = await deleteTask(taskId, req.user._id);

  if (!task) {
    return next(createError(404, 'Task not found'));
  }

  res.status(204).send();
};

export const patchTaskController = async (req, res, next) => {
  const userId = req.user._id;
  const taskId = req.params.taskId;
  const updateData = req.body;

  // if (updateData.boardId) {
  //   return next(createError(400, 'Modifying boardId is not allowed'));
  // }

  const updatedTask = await updateTask(taskId, userId, updateData);

  if (!updatedTask) {
    return next(createError(404, 'Task not found'));
  }

  res.status(200).json({
    status: 200,
    message: 'Task successfully updated!',
    data: updatedTask,
  });
};
