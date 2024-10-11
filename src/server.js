import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { env } from './utils/env.util.js';
import { pinoConfig } from './utils/config.util.js';

import contactsRouter from './routers/contacts.router.js';

import { errorHandlerMiddleware } from './middlewares/error-handler.middleware.js';
import { notFoundHandlerMiddleware } from './middlewares/not-found-handler.middleware.js';

const PORT = env('PORT', 3000);

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(pino(pinoConfig));

  app.use('/contacts', contactsRouter);

  app.use('*', notFoundHandlerMiddleware);
  app.use(errorHandlerMiddleware);

  app.listen(PORT, () => {
    console.log(`Server is available on port ${PORT}`);
  });
};
