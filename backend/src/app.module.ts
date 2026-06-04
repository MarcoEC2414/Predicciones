import { Module } from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
import { PredictionsModule } from './predictions/predictions.module';

@Module({
  imports: [UploadModule, PredictionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
