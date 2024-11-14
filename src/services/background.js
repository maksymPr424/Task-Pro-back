import { Background } from '../db/models/background.js';
import createHttpError from 'http-errors';
export const getBackgroundByName = async (name) => {
  if (name === 'no-background') {
    return { urls: [] };
  }
  const background = await Background.findOne({ name }).lean();
  if (!background) {
    throw createHttpError(404, `Background with ${name} not found`);
  }
  return { urls: background.urls };
};
