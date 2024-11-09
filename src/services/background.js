import { Background } from '../db/models/background.js';

import createHttpError from 'http-errors';
export const getBackgroundById = async (name) => {
  const backgroung = await Background.findOne({ name });
  if (!backgroung) {
    throw createHttpError(404, `Backgroung with ${name} not found`);
  }
  return backgroung;
};
