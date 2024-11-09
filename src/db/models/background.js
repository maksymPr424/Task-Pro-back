import { model, Schema } from 'mongoose';
const BackgroundSchema = new Schema({
  name: String,
  url: String,
});
export const Background = model('backgrounds', BackgroundSchema);
