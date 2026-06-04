import { Injectable, BadRequestException } from '@nestjs/common';
import { RandomForestRegression } from 'ml-random-forest';

const FEATURES = [
  'DistanciaKm',
  'CantidadCajas',
  'Peso (Kg)',
  'TipoProducto',
  'TiempoProduccionHoras',
  'Tiempo Embalaje (Horas)',
  'Tiempo Carga (Horas)',
  'Zona',
  'DiaSemana',
  'HoraPedido',
  'ClienteRecurrente',
  'Tipo Vehiculo',
];

const CATEGORICAL_COLUMNS = [
  'TipoProducto',
  'Zona',
  'DiaSemana',
  'HoraPedido',
  'ClienteRecurrente',
  'Tipo Vehiculo',
];

@Injectable()
export class PredictionsService {
  private model: any = null;
  private encoders: Record<string, Record<string, number>> = {};

  trainModel(rows: Record<string, any>[], headers: string[]) {
    if (!rows || rows.length === 0) {
      throw new BadRequestException('El archivo CSV no contiene registros.');
    }

    // 1. LabelEncoding manual en JS
    this.encoders = {};
    for (const col of CATEGORICAL_COLUMNS) {
      const uniqueValues = Array.from(new Set(rows.map(row => String(row[col] ?? ''))));
      const encoder: Record<string, number> = {};
      uniqueValues.forEach((val, idx) => {
        encoder[val] = idx;
      });
      this.encoders[col] = encoder;
    }

    // 2. Construir matriz X e y
    const X: number[][] = [];
    const y: number[] = [];

    for (const row of rows) {
      // Extraemos features
      const xRow = FEATURES.map(feature => {
        if (CATEGORICAL_COLUMNS.includes(feature)) {
          const val = row[feature];
          const encoder = this.encoders[feature];
          const strVal = String(val ?? '');
          return (encoder && strVal in encoder) ? encoder[strVal] : 0;
        } else {
          const val = row[feature];
          const num = Number(val);
          return isNaN(num) ? 0 : num;
        }
      });

      // Extraemos target
      const targetVal = row['TiempoEntregaHoras'];
      const targetNum = Number(targetVal);
      
      X.push(xRow);
      y.push(isNaN(targetNum) ? 0 : targetNum);
    }

    // 3. Split 80/20 con shuffle aleatorio
    const indices = Array.from({ length: X.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const trainSize = Math.floor(X.length * 0.8);
    // Asegurarse de tener al menos 1 registro en train y test si es posible
    const finalTrainSize = trainSize === 0 && X.length > 0 ? 1 : trainSize;

    const trainIndices = indices.slice(0, finalTrainSize);
    const testIndices = indices.slice(finalTrainSize);

    const X_train = trainIndices.map(i => X[i]);
    const y_train = trainIndices.map(i => y[i]);
    const X_test = testIndices.length > 0 ? testIndices.map(i => X[i]) : X_train;
    const y_test = testIndices.length > 0 ? testIndices.map(i => y[i]) : y_train;

    // 4. Entrenar RandomForestRegression
    this.model = new RandomForestRegression({
      nEstimators: 100,
      seed: 42,
      noOOB: true,
    });
    this.model.train(X_train, y_train);

    // 5. Calcular MAE, RMSE y R²
    const y_pred = this.model.predict(X_test);
    const N = y_test.length;

    let absoluteErrorSum = 0;
    let squaredErrorSum = 0;
    let y_test_sum = 0;

    for (let i = 0; i < N; i++) {
      const diff = y_test[i] - y_pred[i];
      absoluteErrorSum += Math.abs(diff);
      squaredErrorSum += diff * diff;
      y_test_sum += y_test[i];
    }

    const mae = N > 0 ? absoluteErrorSum / N : 0;
    const rmse = N > 0 ? Math.sqrt(squaredErrorSum / N) : 0;

    const y_test_mean = N > 0 ? y_test_sum / N : 0;
    let totalSquaredSum = 0;
    for (let i = 0; i < N; i++) {
      const diff = y_test[i] - y_test_mean;
      totalSquaredSum += diff * diff;
    }

    const r2 = totalSquaredSum > 0 ? 1 - (squaredErrorSum / totalSquaredSum) : 1.0;

    // 6. Feature importances
    const importances = this.model.featureImportance();
    const featureImportances = FEATURES.map((feature, idx) => ({
      feature,
      importance: importances[idx] ?? 0,
    })).sort((a, b) => b.importance - a.importance);

    return {
      mae,
      rmse,
      r2,
      featureImportances,
    };
  }

  predict(inputData: Record<string, any>) {
    if (!this.model) {
      throw new BadRequestException('El modelo no ha sido entrenado todavía.');
    }

    // Aplicar los mismos encoders
    const row = FEATURES.map(feature => {
      if (CATEGORICAL_COLUMNS.includes(feature)) {
        const val = inputData[feature];
        const encoder = this.encoders[feature];
        const strVal = String(val ?? '');
        return (encoder && strVal in encoder) ? encoder[strVal] : 0;
      } else {
        const val = inputData[feature];
        const num = Number(val);
        return isNaN(num) ? 0 : num;
      }
    });

    const predictions = this.model.predict([row]);
    const prediccion_horas = predictions[0] ?? 0;
    const prediccion_dias = prediccion_horas / 24;

    return {
      prediccion_horas,
      prediccion_dias,
    };
  }
}

