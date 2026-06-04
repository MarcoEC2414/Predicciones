import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const corsOrigins = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',').map((s) => s.trim())
    : ['http://localhost:5173'];
  app.enableCors({ origin: corsOrigins });
  app.setGlobalPrefix('api');

  if (process.env.NODE_ENV === 'production') {
    const publicPath = join(__dirname, '..', 'public');
    app.useStaticAssets(publicPath);
    app.use((req, res, next) => {
      if (req.method !== 'GET' || req.path.startsWith('/api')) {
        return next();
      }
      res.sendFile(join(publicPath, 'index.html'), (err) => {
        if (err) next();
      });
    });
  }

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
}
bootstrap();

