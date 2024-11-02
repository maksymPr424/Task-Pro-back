import { Schema, model } from 'mongoose';
import { emailRegExp } from '../../constants/user-constants.js';

const userSchema = new Schema(
  {
    photoUrl: {
      type: String,
      default: null,
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'violet'],
      default: 'light',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegExp,
    },
    password: {
      type: String,
      required: true,
    },
    lastActiveBoard: {
      type: Schema.Types.ObjectId,
      ref: 'boards',
      default: null,
    },
  },
  { timestamps: true, versionKey: false },
);

export const UserCollection = model('users', userSchema);
