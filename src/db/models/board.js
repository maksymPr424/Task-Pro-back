import { model, Schema } from 'mongoose';
import { BACKGROUND_LIST, ICON_LIST } from '../../constants/board.js';

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'The title field cannot be empty'],
    },
    icon: {
      type: String,
      enum: ICON_LIST,
      default: 'project',
    },
    background: {
      type: String,
      enum: BACKGROUND_LIST,
      default: 'no-background',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Board = model('board', boardSchema);