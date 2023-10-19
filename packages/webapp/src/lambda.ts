import awsLambdaFastify, { PromiseHandler } from '@fastify/aws-lambda';
import { Context, Handler } from 'aws-lambda';
import { createServer } from './server';

let app: Handler;

export const handler: PromiseHandler = async (event: any, context: Context) => {
  app = app ?? (await createServer());
  const instance = app.getHttpAdapter().getInstance();
  const lambda = awsLambdaFastify(instance);

  return lambda(event, context);
};
