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
import {
  createContactSchema,
  patchContactSchema,
} from '../validation/contacts.schema.js';
import { isValidId } from '../middlewares/validate-id.middleware.js';
import { authenticate } from '../middlewares/authenticate.middleware.js';

const jsonParser = express.json();
const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllContactsController));

router.get(
  '/:contactId',
  isValidId('contactId'),
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  isValidId('contactId'),
  jsonParser,
  validateBody(patchContactSchema),
  ctrlWrapper(updateContactController),
);

router.delete(
  '/:contactId',
  isValidId('contactId'),
  ctrlWrapper(deleteContactController),
);

export default router;
