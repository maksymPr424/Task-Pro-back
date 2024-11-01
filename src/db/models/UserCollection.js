import { Schema, model } from 'mongoose';
import { emailRegExp } from '../../constants/user-constants.js';

const userSchema = new Schema(
  {
    photoUrl: {
      type: String,
      default: 'path/to/default/photo.jpg',
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
    activeBoard: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false },
);

export const UserCollection = model('users', userSchema);
