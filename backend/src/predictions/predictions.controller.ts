import { Controller, Post, UploadedFile, UseInterceptors, Body, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PredictionsService } from './predictions.service';
import { UploadService } from '../upload/upload.service';

@Controller('predictions')
export class PredictionsController {
  constructor(
    private readonly predictionsService: PredictionsService,
    private readonly uploadService: UploadService,
  ) {}

  @Post('train')
  @UseInterceptors(FileInterceptor('file'))
  async train(@UploadedFile() file: any) {
    if (!file) {
      throw new BadRequestException('Por favor, sube un archivo CSV.');
    }
    const { headers, rows, total } = this.uploadService.parseCSV(file.buffer);
    const metrics = this.predictionsService.trainModel(rows, headers);
    return {
      success: true,
      headers,
      rows,
      total,
      ...metrics,
    };
  }

  @Post('predict')
  predict(@Body() body: Record<string, any>) {
    return this.predictionsService.predict(body);
  }
}

