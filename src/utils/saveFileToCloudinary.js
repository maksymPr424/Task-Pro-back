import cloudinary from './cloudinaryConfig.js';
import * as fs from 'node:fs/promises';

const saveFileToCloudinary = async (file, folder) => {
  const response = await cloudinary.uploader.upload(file.path, { folder });
  await fs.unlink(file.path);
  return response.secure_url;
};

export default saveFileToCloudinary;
