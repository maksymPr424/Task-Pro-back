import { model, Schema } from 'mongoose';

const columnsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    boardId: { type: Schema.Types.ObjectId, ref: 'board' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ColumnsCollection = model('columns', columnsSchema);