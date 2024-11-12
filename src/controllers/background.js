import { getBackgroundByName } from '../services/background.js';
export const getBackgroundByIdController = async (req, res) => {
  const { name } = req.params;

  const { urls: backgrounds } = await getBackgroundByName(name);
  res.status(200).json(backgrounds);
};
