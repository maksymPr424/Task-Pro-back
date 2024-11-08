import { Board } from '../db/models/board.js';
import createHttpError from 'http-errors';
import { tasksCollection } from '../db/models/tasks.js';
import { ColumnsCollection } from '../db/models/column.js';
import { UserCollection } from '../db/models/UserCollection.js';

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
    const columns = await ColumnsCollection.find({
      boardId: lastActiveBoardId,
    });

    const populatedColumns = await Promise.all(
      columns.map(async (column) => {
        const tasks = await tasksCollection.find({ columnId: column._id });
        return { ...column.toObject(), tasks };
      }),
    );

    populatedLastActiveBoard = {
      ...lastActiveBoard.toObject(),
      columns: populatedColumns,
    };
  }

  const remainingBoards = await Board.find({
    userId,
    _id: { $ne: lastActiveBoardId },
  });

  let populatedRemainingBoards = remainingBoards.map((board) =>
    board.toObject(),
  );

  if (lastActiveBoard === null && remainingBoards.length > 0) {
    const firstBoard = remainingBoards[0];
    const columns = await ColumnsCollection.find({ boardId: firstBoard._id });
    const populatedColumns = await Promise.all(
      columns.map(async (column) => {
        const tasks = await tasksCollection.find({ columnId: column._id });
        return { ...column.toObject(), tasks };
      }),
    );

    populatedRemainingBoards[0] = {
      ...firstBoard.toObject(),
      columns: populatedColumns,
    };
  }

  return {
    lastActiveBoard: populatedLastActiveBoard,
    remainingBoards: populatedRemainingBoards,
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
  await tasksCollection.deleteMany({ userId, boardId });
  await ColumnsCollection.deleteMany({ userId, boardId });

  if (!deletedBoard) {
    throw createHttpError(404, `Board with id ${boardId} not found`);
  }
};
