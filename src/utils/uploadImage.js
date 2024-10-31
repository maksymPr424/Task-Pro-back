import saveFileToCloudinary from './saveFileToCloudinary.js';

export const uploadImage = async (file, folder, existingPhoto) => {
  if (!file) return existingPhoto;

  return await saveFileToCloudinary(file, folder);
};

export default uploadImage;
