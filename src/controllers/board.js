import { mongoose } from 'mongoose';
import {
  addBoard,
  deleteBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
} from '../services/board.js';

export const getAllBoardsController = async (req, res) => {
  const userId = req.user._id;
  const boardsList = await getAllBoards(userId);
  res.status(200).json(boardsList);
};

export const getBoardByIdController = async (req, res) => {
  const board = await getBoardById(req.params.id);
  res.status(200).json(board);
};

export const addBoardController = async (req, res) => {
  const userId = req.user._id;
  const ownerId = new mongoose.Types.ObjectId(userId);
  const newBoard = await addBoard(ownerId, req.body);
  res.status(201).json(newBoard);
};

export const updateBoardController = async (req, res) => {
  const userId = req.user._id;
  const boardId = req.params.id;
  const updatedBoard = await updateBoard(boardId, userId, { ...req.body });
  res.status(200).json(updatedBoard);
};

export const deleteBoardController = async (req, res) => {
  const userId = req.user._id;
  const boardId = req.params.id;
  await deleteBoard(userId, boardId);
  res.status(204).send();
};