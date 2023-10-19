import { createServer } from './server';

async function start() {
  const app = await createServer();
  app.listen(process.env.PORT ?? 3000);
}
start();
