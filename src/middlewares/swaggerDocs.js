import swaggerUI from 'swagger-ui-express';
import createHttpError from 'http-errors';
import { readFileSync } from 'node:fs';
import { SWAGGER_PATH } from '../constants/path.js';

const swaggerDocs = () => {
  try {
    const swaggerContent = readFileSync(SWAGGER_PATH, 'utf-8');
    const swaggerData = JSON.parse(swaggerContent);
    return [...swaggerUI.serve, swaggerUI.setup(swaggerData)];
  } catch (error) {
    return (req, res, next) =>
      next(createHttpError(500, 'Unable to find Swagger docs'));
  }
};

export default swaggerDocs;
