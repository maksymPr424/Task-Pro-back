import { getBackgroundByName } from '../services/background.js';
export const getBackgroundByIdController = async (req, res) => {
  const { name } = req.params;
  const background = await getBackgroundByName(name);
  res.status(200).json(background);
};
