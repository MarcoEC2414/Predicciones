import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import express, { Express } from 'express';
import { AppModule } from './app.module';
import { configureApp } from './configure-app';

let cachedExpressApp: Express;

export async function getExpressApp(): Promise<Express> {
  if (cachedExpressApp) {
    return cachedExpressApp;
  }

  const expressApp = express();
  expressApp.use((req, _res, next) => {
    if (process.env.VERCEL && req.url && !req.url.startsWith('/api')) {
      req.url = `/api${req.url}`;
    }
    next();
  });

  const nestApp = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  configureApp(nestApp);
  await nestApp.init();
  cachedExpressApp = expressApp;
  return expressApp;
}
