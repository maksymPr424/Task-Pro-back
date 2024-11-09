import { Background } from '../db/models/background.js';
import createHttpError from 'http-errors';

export const getBackgroundById = async (name) => {
  const background = await Background.findOne({ name });
  if (!background) {
    throw createHttpError(404, `Backgroung with ${name} not found`);
  }
  return background;
};
