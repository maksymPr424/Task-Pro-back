import { Board } from '../db/models/board.js';
import createHttpError from 'http-errors';

export const getAllBoards = async (userId) => {
  const boards = await Board.find({ userId });
  if (boards.length === 0) {
    throw createHttpError(404, `No boards was found for user ${userId}`);
  }
  return boards;
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
    throw createHttpError(409, `Board with ${data.title} already exists`);
  }
  return await Board.create({ userId, ...data });
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
  return updateBoard;
};

export const deleteBoard = async (userId, boardId) => {
  const deletedBoard = await Board.findOneAndDelete({
    _id: boardId,
    userId,
  });
  //   await Column.deleteMany({ boardId, userId });
  //   await Tasks.deleteMany({ boardId, userId});

  if (!deletedBoard) {
    throw createHttpError(404, `Board with id ${boardId} not found`);
  }
  return true;
};
