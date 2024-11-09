import { model, Schema } from 'mongoose';

const ImageUrlsSchema = new Schema({
  mobile: { type: String, required: true },
  tablet: { type: String, required: true },
  desktop: { type: String, required: true },
});

const BackgroundSchema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  urls: { type: ImageUrlsSchema, required: true },
});

export const Background = model('background', BackgroundSchema);
