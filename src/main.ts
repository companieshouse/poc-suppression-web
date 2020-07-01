import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as nunjucks from 'nunjucks';
import { join } from 'path';
import * as express from 'express';


async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setViewEngine('html');
  app.useStaticAssets('public');
  app.setBaseViewsDir('views');

  app.use('/public', express.static(join(__dirname, '..', 'public')));
  app.use('/', express.static(join(__dirname, '..', 'node_modules/govuk-frontend/')));

  nunjucks.configure([
    'views',
    'node_modules/govuk-frontend',
  ], {
    autoescape: true,
    express: app,
    web: {
      async: true,
      useCache: false
    },
    watch: true
  });

  await app.listen(4000);
}
bootstrap();
