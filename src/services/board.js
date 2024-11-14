import { Board } from '../db/models/board.js';
import createHttpError from 'http-errors';
import { UserCollection } from '../db/models/UserCollection.js';
import { deleteColumns, getBoardColumnsWithTasks } from './columns.js';

const updateUserLastActiveBoard = async (userId, boardId) => {
  const updatedUser = await UserCollection.findOneAndUpdate(
    { _id: userId },
    { lastActiveBoard: boardId },
    { new: true },
  );

  if (!updatedUser) {
    throw createHttpError(500, 'Failed to update lastActiveBoard for the user');
  }
};

export const getAllBoards = async (userId) => {
  const user = await UserCollection.findById(userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const lastActiveBoardId = user.lastActiveBoard;

  const lastActiveBoard = lastActiveBoardId
    ? await Board.findOne({ _id: lastActiveBoardId, userId }).select(
        '-createdAt -updatedAt',
      )
    : null;

  let populatedLastActiveBoard = null;

  if (lastActiveBoard) {
    const columns = await getBoardColumnsWithTasks(userId, lastActiveBoardId);

    populatedLastActiveBoard = {
      ...lastActiveBoard.toObject(),
      columns,
    };
  }

  const remainingBoards = await Board.find({ userId }).select(
    '-createdAt -updatedAt',
  );

  return {
    lastActiveBoard: populatedLastActiveBoard,
    boards: remainingBoards,
  };
};

export const getBoardById = async (boardId, userId) => {
  const board = await Board.findById({ _id: boardId }).lean();
  if (!board) {
    throw createHttpError(404, `Board with ${boardId} not found`);
  }

  await updateUserLastActiveBoard(userId, boardId);

  return board;
};

export const addBoard = async (userId, data) => {
  const newBoard = await Board.create({ userId, ...data });
  const boardWithoutTimestamps = newBoard.toObject();
  delete boardWithoutTimestamps.createdAt;
  delete boardWithoutTimestamps.updatedAt;
  await updateUserLastActiveBoard(userId, newBoard._id);
  return boardWithoutTimestamps;
};

export const updateBoard = async (boardId, userId, data) => {
  const updateBoard = await Board.findOneAndUpdate(
    {
      _id: boardId,
      userId,
    },
    data,
    {
      new: true,
    },
  );

  if (!updateBoard) {
    throw createHttpError(404, `Board with id ${boardId} not found`);
  }

  if (!Object.keys(data).length) {
    throw createHttpError(
      400,
      'Requires at least one field (title, icon or background)',
    );
  }
  return updateBoard;
};

export const deleteBoard = async (userId, boardId) => {
  const deletedBoard = await Board.findOneAndDelete({
    _id: boardId,
    userId,
  });

  if (!deletedBoard) {
    throw createHttpError(404, `Board with id ${boardId} not found`);
  }

  const boards = await Board.find({ userId }).select('-createdAt -updatedAt');

  const newLastActiveBoard = boards.length > 0 ? boards[0] : null;

  await updateUserLastActiveBoard(
    userId,
    newLastActiveBoard ? newLastActiveBoard._id : null,
  );

  await deleteColumns(userId, boardId);

  let populatedLastActiveBoard = null;

  if (newLastActiveBoard) {
    const columns = await getBoardColumnsWithTasks(
      userId,
      newLastActiveBoard._id,
    );
    populatedLastActiveBoard = {
      ...newLastActiveBoard.toObject(),
      columns,
    };
  }

  return {
    lastActiveBoard: populatedLastActiveBoard,
  };
};
