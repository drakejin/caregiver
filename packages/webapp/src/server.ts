import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as hbs from 'hbs';

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
    options: {
      // partials: join(__dirname, '..', 'views/partials'),
      partials: {
        header: './partials/header.hbs',
      },
      compileOptions: {
        preventIndent: true,
      },
      useDataVariables: true,
    },
  });
  await app.init();
  return app;
};
