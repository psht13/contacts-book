import { initMongoDB } from './db/initMongoDB.js';
import { startServer } from './server.js';

const main = async () => {
  await initMongoDB();
  startServer();
};

main();
