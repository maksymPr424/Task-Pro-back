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
    priority: {
      type: String,
      required: false,
      enum: ['none', 'low', 'medium', 'high'],
      default: 'none',
    },
    deadline: {
      type: Date,
      default: Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow at this time
      required: false,
    },
    column: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'board',
      required: true,
    },
    // columnId: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'column',
    //   required: true,
    // },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const tasksCollection = model('tasks', taskSchema);
