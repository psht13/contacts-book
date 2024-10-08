import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const main = async () => {
  await initMongoConnection();
  setupServer();
};

main();
