const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const http = require('http');
const { createApp } = require('./app');
const { connectDb } = require('./config/db');
const { ensureAdminUser } = require('./utils/seedAdmin');
const { seedPositions }  = require('./utils/seedPositions');

async function startServer() {
  await connectDb();
  await ensureAdminUser();
  await seedPositions();

  const app = createApp();
  const port = Number(process.env.PORT || 3001);
  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start backend', error);
  process.exit(1);
});
