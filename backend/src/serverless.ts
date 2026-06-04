import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import express from 'express';
import serverlessExpress from '@vendia/serverless-express';
import { AppModule } from './app.module';
import { configureApp } from './configure-app';

let cachedHandler: ReturnType<typeof serverlessExpress>;

export async function getServerlessHandler() {
  if (cachedHandler) {
    return cachedHandler;
  }

  const expressApp = express();
  const nestApp = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  configureApp(nestApp);
  await nestApp.init();
  cachedHandler = serverlessExpress({ app: expressApp });
  return cachedHandler;
}
