import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/sessions.model.js';
import { UsersCollection } from '../db/models/users.model.js';

export const authenticate = async (req, res, next) => {
  const authorizationHeader = req.get('authorization');

  if (!authorizationHeader) {
    return next(createHttpError(401, 'Authorization token missing'));
  }

  const [scheme, token] = authorizationHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Invalid authorization header format'));
  }

  const session = await SessionsCollection.findOne({ accessToken: token });

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  if (new Date() > new Date(session.accessTokenValidUntil)) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const user = await UsersCollection.findOne({ _id: session.userId });

  if (!user) {
    return next(createHttpError(401, 'User not authorized'));
  }

  req.user = { _id: user._id, name: user.name };
  next();
};
