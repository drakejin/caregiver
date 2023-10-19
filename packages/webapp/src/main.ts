import serverlessFastify, { CallbackHandler } from '@fastify/aws-lambda';
import { Callback, Context, Handler } from 'aws-lambda';
import { createServer } from './server';

let app;

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  app = app ?? (await createServer());
  const instance = app.getHttpAdapter().getInstance();
  const lambda: CallbackHandler = serverlessFastify(instance);
  console.log(event);
  return lambda(event, context, callback);
};

async function start() {
  const app = await createServer();
  app.listen(process.env.PORT ?? 3000);
}
if (process.env.NEST_ENV !== 'lambda') {
  start();
}
