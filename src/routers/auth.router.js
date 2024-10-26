import express from 'express';
import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrl-wrapper.js';

import {
  loginUserController,
  logoutUserController,
  refreshUsersSessionController,
  registerUserController,
} from '../controllers/auth.controller.js';

import { validateBody } from '../middlewares/validate-body.middleware.js';

import {
  loginUserSchema,
  registerUserSchema,
} from '../validation/auth.schema.js';

const jsonParser = express.json();
const router = Router();

router.post(
  '/register',
  jsonParser,
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  jsonParser,
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/refresh', ctrlWrapper(refreshUsersSessionController));

router.post('/logout', ctrlWrapper(logoutUserController));

export default router;
