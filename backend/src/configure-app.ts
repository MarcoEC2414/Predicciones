import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

export function configureApp(app: NestExpressApplication) {
  const corsOrigins = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',').map((s) => s.trim())
    : process.env.VERCEL_URL
      ? [`https://${process.env.VERCEL_URL}`]
      : ['http://localhost:5173'];

  app.enableCors({ origin: corsOrigins });
  app.setGlobalPrefix('api');

  if (process.env.SERVE_STATIC === 'true' && process.env.NODE_ENV === 'production') {
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
}
