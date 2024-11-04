import createHttpError from 'http-errors';
import { Board } from '../db/models/board.js';

export const findBoardById = async (req, res, next) => {
  try {
    const { boardId } = req.query;
    const board = await Board.findById(boardId);

    if (!board) {
      return next(createHttpError(404, `Board with id ${boardId} not found`));
    }

    req.board = board;
    next();
  } catch (error) {
    next(error);
  }
};
