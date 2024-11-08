import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './utils/env.js';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { UPLOAD_DIR } from './constants/auth.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

const PORT = Number(env('PORT', 3000));
export const setupServer = () => {
  const app = express();
  app.use(cookieParser());
  app.use(
    cors({
      origin: [
        /http:\/\/localhost:\d+$/,
        'https://task-pro.app',
        'https://www.task-pro.app',
        'https://task-pro-nu.vercel.app',
      ],
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());
  app.get('/', (req, res) => {
    res.json({ message: 'Hello.' });
  });

  // app.use(router);
  app.use(router);

  app.use('*', notFoundHandler);
  app.use(errorHandler);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
};
