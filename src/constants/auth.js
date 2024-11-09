import path from 'node:path';

export const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
