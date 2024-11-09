import { model, Schema } from 'mongoose';

const BackgroundSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    urls: {
      type: {
        mobile: { type: String, required: true },
        tablet: { type: String, required: true },
        desktop: { type: String, required: true },
      },
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Background = model('background', BackgroundSchema);
