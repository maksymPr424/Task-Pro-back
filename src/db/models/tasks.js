import { id_ID } from '@faker-js/faker';
import { Schema, model } from 'mongoose';

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    labelColor: {
      type: String,
      enum: ['grey', 'violet', 'green', 'pink'],
      default: 'none',
      required: false,
    },
    priority: {
      type: String,
      required: false,
      enum: ['none', 'low', 'medium', 'high'],
      default: 'none',
    },
    deadline: {
      type: Date,
      default: Date.now,
      required: true,
    },
    column: {
      type: String, //or need enum? [toDo, inProgress, done, custom]
      default: 'To do',
      required: true,
    },

    // boadrId: {
    //   type: id_ID,
    //   default: 'To do',
    //   required: true,
    // },

    // userId: {
    //   type: id_ID,
    //   required: true,
    // },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const tasksCollection = model('contacts', taskSchema);
