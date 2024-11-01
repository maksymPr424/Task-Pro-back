import { Board } from '../db/models/board.js';
import { UserCollection } from '../db/models/UserCollection.js';
import { HttpError } from 'http-errors';

export const addBoard = async (req, res) => {
  const userId = req.user._id;
  const { title } = req.body;

  const isBoardExists = await Board.findOne({ userId, title });
  if (isBoardExists) {
    throw HttpError(404, `Board "${title}" already exists`);
  }

  const newBoard = await Board.create({ ...req.body, userId });
  const newBoardId = newBoard._id;

  await UserCollection.findByIdAndUpdate(userId, {
    activeBoard: newBoardId,
  });

  res.status(201).json({
    message: 'The operation was successfully completed',
    data: newBoard,
  });
};

export const updateBoard = async (req, res) => {
  const { id } = req.params;
  let { title, icon, background } = req.body;

  const board = await Board.findById(id);

  if (!board) throw HttpError(404, `The board ID ${id} was not found`);

  if (title === undefined) {
    title = board.title;
  }

  if (icon === undefined) {
    icon = board.icon;
  }

  if (background === undefined) {
    background = board.background;
  }

  if (
    title !== board.title ||
    icon !== board.icon ||
    background !== board.background
  ) {
    const updatedBoard = await Board.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      {
        new: true,
      },
    );

    res.status(200).json({
      message: 'The operation was successfully compeleted',
      data: updatedBoard,
    });
  } else {
    throw HttpError(400, `The board ID ${id} has not changed`);
  }
};

export const deleteBoard = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const deletedBoard = await Board.findByIdAndDelete(id);

  if (!deletedBoard) {
    throw HttpError(404, `Board with id ${id} not found`);
  }

  await UserCollection.findByIdAndUpdate(userId, {
    activeBoard: null,
  });

  res.json({
    id,
    message: `Board with id ${id} deleted successfully`,
  });
};

export const getAllBoards = async (req, res) => {
  // const userId = req.user._id;
  const userId = req.params.userId;

  const boardsList = await Board.find({ userId });
  if (boardsList.length === 0) {
    throw HttpError(404, `No board was found for user ${userId}`);
  }

  res.status(200).json({
    message: 'The operation was successfully completed',
    data: boardsList,
  });
};

export const getBoardById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const board = await Board.findById(id);

  if (!board) throw HttpError(404, `The board ID ${id} was not found`);

  await UserCollection.findByIdAndUpdate(userId, {
    activeBoard: id,
  });

  res.status(200).json({
    message: 'The operation was successfully completed',
    // data:
  });
};
