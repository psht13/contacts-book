import { initMongoConnection } from './db/init-db-connection.js';
import { setupServer } from './server.js';

const main = async () => {
  await initMongoConnection();
  setupServer();
};

main();
