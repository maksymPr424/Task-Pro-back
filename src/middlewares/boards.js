import createHttpError from 'http-errors';
import { Board } from '../db/models/board.js';

export const findBoardById = async (req, res, next) => {
  try {
    //if boardId taken only from params, an arror occures during Postman tests
    // const boardId = req.params.boardId;
    const boardId = req.query.boardId || req.params.boardId;
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
