// import { getBackgroundById } from '../services/background.js';
// export const getBackgroundByIdController = async (req, res) => {
//   const { name } = req.params;
//   const backgroung = await getBackgroundById(name);
//   console.log(backgroung);
//   res.status(200).json(backgroung);
// };

import { getBackgroundById } from '../services/background.js';
import createHttpError from 'http-errors';

export const getBackgroundByIdController = async (req, res, next) => {
  try {
    const { name } = req.params;
    if (!name) {
      throw createHttpError(400, 'Name parameter is missing');
    }
    const background = await getBackgroundById(name);
    res.status(200).json(background);
  } catch (error) {
    next(error);
  }
};
