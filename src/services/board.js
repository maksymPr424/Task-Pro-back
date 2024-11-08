import { Board } from '../db/models/board.js';
import createHttpError from 'http-errors';
import { UserCollection } from '../db/models/UserCollection.js';
import { deleteColumns, getBoardColumnsWithTasks } from './columns.js';

export const getAllBoards = async (userId) => {
  const user = await UserCollection.findById(userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const lastActiveBoardId = user.lastActiveBoard;

  const lastActiveBoard = lastActiveBoardId
    ? await Board.findOne({ _id: lastActiveBoardId, userId })
    : null;

  let populatedLastActiveBoard = null;

  if (lastActiveBoard) {
    const columns = await getBoardColumnsWithTasks(userId, lastActiveBoardId);

    populatedLastActiveBoard = {
      ...lastActiveBoard.toObject(),
      columns,
    };
  }

  const remainingBoards = await Board.find({
    userId,
  });

  return {
    lastActiveBoard: populatedLastActiveBoard,
    remainingBoards,
  };
};

export const getBoardById = async (boardId) => {
  const board = await Board.findById({ _id: boardId });
  if (!board) {
    throw createHttpError(404, `Board with ${boardId} not found`);
  }

  return board;
};

export const addBoard = async (userId, data) => {
  const exist = await Board.findOne({ userId, title: data.title });

  if (exist) {
    throw createHttpError(409, `Board with name ${data.title} already exists`);
  }
  return Board.create({ userId, ...data });
};

export const updateBoard = async (boardId, userId, data) => {
  const exist = await Board.findOne({ userId, title: data.title });

  if (exist) {
    throw createHttpError(409, `Board with name ${data.title} already exists`);
  }

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

  await deleteColumns(userId, boardId);

  if (!deletedBoard) {
    throw createHttpError(404, `Board with id ${boardId} not found`);
  }
};
