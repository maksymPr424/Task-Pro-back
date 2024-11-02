import { TEMP_UPLOADS_DIR } from './constants/path.js';
import { initMongoDB } from './db/initMongoDB.js';
import { setupServer } from './server.js';
import createDirIfNotExists from './utils/createDirIfNotExists.js';

const bootstrap = async () => {
  await initMongoDB();
  await createDirIfNotExists(TEMP_UPLOADS_DIR);
  setupServer();
};

bootstrap();
