import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { join } from 'path';

export const createServer = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });
  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
    },
    templates: join(__dirname, '..', 'views'),
  });
  await app.init();
  return app;
};
