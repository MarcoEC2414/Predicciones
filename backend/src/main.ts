import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { configureApp } from './configure-app';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
    process.env.SERVE_STATIC = 'true';
  }
  configureApp(app);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
}
bootstrap();

