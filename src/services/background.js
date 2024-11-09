import { Background } from '../db/models/background.js';
import createHttpError from 'http-errors';
export const getBackgroundByName = async (name) => {
  const background = await Background.findOne({ name });
  if (!background) {
    throw createHttpError(404, `Background with ${name} not found`);
  }
  return background;
};
