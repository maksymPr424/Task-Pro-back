import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';

const cloud_name = env('CLOUDINARY_CLOUD_NAME');
const api_key = env('CLOUDINARY_API_KEY');
const api_secret = env('CLOUDINARY_API_SECRET');

cloudinary.config({ cloud_name, api_key, api_secret });

export default cloudinary;
