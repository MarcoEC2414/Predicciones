import { Injectable } from '@nestjs/common';
import * as Papa from 'papaparse';

@Injectable()
export class UploadService {
  parseCSV(buffer: Buffer): { headers: string[]; rows: Record<string, any>[]; total: number } {
    const csvString = buffer.toString('utf8');
    const parsed = Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
    });

    const rows = parsed.data as Record<string, any>[];
    const headers = parsed.meta.fields || [];
    const total = rows.length;

    return { headers, rows, total };
  }
}

