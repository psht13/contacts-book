import { Router } from 'express';
import express from 'express';

import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
} from '../controllers/contacts.controller.js';

import { ctrlWrapper } from '../utils/ctrl-wrapper.js';
import { validateBody } from '../middlewares/validate-body.middleware.js';
import { createContactSchema } from '../validation/contacts.schema.js';
import { isValidId } from '../middlewares/validate-id.middleware.js';

const router = Router();

router.get('/', ctrlWrapper(getAllContactsController));

router.get(
  '/:contactId',
  isValidId('contactId'),
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  express.json(),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  isValidId('contactId'),
  express.json(),
  validateBody(createContactSchema),
  ctrlWrapper(updateContactController),
);

router.delete(
  '/:contactId',
  isValidId('contactId'),
  ctrlWrapper(deleteContactController),
);

export default router;
