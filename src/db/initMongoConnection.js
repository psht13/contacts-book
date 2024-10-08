import mongoose from 'mongoose';

import { env } from '../utils/env.util.js';

export const initMongoConnection = async () => {
  try {
    const uri = env('MONGODB_CONNECTION_URI');

    await mongoose.connect(uri);
    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};
