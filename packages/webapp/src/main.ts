import serverlessFastify, { CallbackHandler } from '@fastify/aws-lambda';
import { Callback, Context, Handler } from 'aws-lambda';
import { createServer } from './server';

const fastifiedLambda = async (): Promise<Handler> => {
  const app = await createServer();
  const instance = app.getHttpAdapter().getInstance();
  const fastified: CallbackHandler = serverlessFastify(instance);
  return fastified;
};

let lambdaHandler: Handler;
export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  lambdaHandler = lambdaHandler ?? (await fastifiedLambda());
  return lambdaHandler(event, context, callback);
};

async function start() {
  const app = await createServer();
  app.listen(process.env.PORT ?? 3000);
}
if (process.env.NEST_ENV !== 'lambda') {
  start();
}
