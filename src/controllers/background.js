import { getBackgroundById } from '../services/background.js';
export const getBackgroundByIdController = async (req, res) => {
  const backgroung = await getBackgroundById(req.name);
  console.log(backgroung);
  res.status(200).json(backgroung);
};
