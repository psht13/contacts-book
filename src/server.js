// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { env } from './utils/env.util.js';
import { pinoConfig } from './utils/config.util.js';
import { getAllContacts, getContactById } from './services/contacts.service.js';

const PORT = env('PORT', 3000);

export const setupServer = () => {
  const app = express();

  // setup middlewares
  app.use(express.json());
  app.use(cors());
  app.use(pino(pinoConfig));

  //================================================================
  // routes
  app.get('/', (_req, res) => {
    res.status(200).json({
      message: 'Hello, Node!',
    });
  });

  app.get('/contacts', async (_req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    const contact = await getContactById(id);

    if (!contact) {
      res.status(404).json({
        message: 'Contact not found.',
      });
    }

    if (contact) {
      res.status(200).json({
        status: 200,
        message: 'Successfully found contact!',
        data: contact,
      });
    }
  });

  //================================================================
  // error-handlers
  app.use('*', (_req, res, _next) => {
    res.status(404).json({
      message: 'Route not found.',
    });
  });

  app.use((err, _req, res, _next) => {
    res.status(500).json({
      message: 'Internal server error.',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is available on port ${PORT}.`);
  });
};
