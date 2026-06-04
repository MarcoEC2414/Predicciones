import React, { useState } from 'react';
import UploadZone from './components/UploadZone';
import DataPreview from './components/DataPreview';
import MetricsPanel from './components/MetricsPanel';
import FeatureImportance from './components/FeatureImportance';
import PredictForm from './components/PredictForm';
import PredictionOutput from './components/PredictionOutput';

export default function App() {
  const [step, setStep] = useState(1); // 1: Upload, 2: Metrics/Preview, 3: Predict
  const [csvData, setCsvData] = useState(null); // { headers, rows, total }
  const [metrics, setMetrics] = useState(null); // { mae, rmse, r2 }
  const [featureImportances, setFeatureImportances] = useState([]);
  const [prediction, setPrediction] = useState(null); // { prediccion_horas, prediccion_dias }
  const [error, setError] = useState('');

  const handleUploadSuccess = (data) => {
    setCsvData({
      headers: data.headers,
      rows: data.rows,
      total: data.total,
    });
    setMetrics({
      mae: data.mae,
      rmse: data.rmse,
      r2: data.r2,
    });
    setFeatureImportances(data.featureImportances || []);
    setError('');
    setStep(2); // Go to step 2 automatically on upload success
  };

  const handlePredictionSuccess = (result) => {
    setPrediction(result);
    setError('');
  };

  const handleReset = () => {
    setStep(1);
    setCsvData(null);
    setMetrics(null);
    setFeatureImportances([]);
    setPrediction(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col selection:bg-blue-500/30 selection:text-blue-200">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔮</span>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Predicciones
              </h1>
              <p className="text-xs text-slate-400 font-medium">Random Forest Regressor</p>
            </div>
          </div>
          
          {csvData && (
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-slate-700 hover:border-slate-600 rounded-lg text-sm font-medium text-slate-300 hover:text-white transition duration-150 ease-in-out cursor-pointer bg-slate-800/40"
            >
              Reiniciar Proyecto ↺
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        
        {/* Stepper visual */}
        <div className="w-full max-w-3xl mx-auto mb-4">
          <div className="flex items-center justify-between relative">
            {/* Background Line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-800 -z-10"></div>
            
            {/* Step 1 */}
            <button
              disabled={step < 1}
              onClick={() => step > 1 && setStep(1)}
              className={`flex flex-col items-center gap-2 group focus:outline-none ${step > 1 ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                step === 1 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20 scale-110' 
                  : step > 1 
                  ? 'bg-slate-800 border-green-500 text-green-400' 
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}>
                {step > 1 ? '✓' : '1'}
              </div>
              <span className={`text-xs font-semibold tracking-wide uppercase transition-colors duration-300 ${
                step === 1 ? 'text-blue-400' : step > 1 ? 'text-green-400' : 'text-slate-500'
              }`}>
                Cargar CSV
              </span>
            </button>

            {/* Step 2 */}
            <button
              disabled={!csvData}
              onClick={() => csvData && setStep(2)}
              className={`flex flex-col items-center gap-2 group focus:outline-none ${csvData ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                step === 2 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20 scale-110' 
                  : step > 2 
                  ? 'bg-slate-800 border-green-500 text-green-400'
                  : csvData 
                  ? 'bg-slate-800 border-slate-700 text-slate-300' 
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}>
                {step > 2 ? '✓' : '2'}
              </div>
              <span className={`text-xs font-semibold tracking-wide uppercase transition-colors duration-300 ${
                step === 2 ? 'text-blue-400' : step > 2 ? 'text-green-400' : csvData ? 'text-slate-300' : 'text-slate-500'
              }`}>
                Métricas del Modelo
              </span>
            </button>

            {/* Step 3 */}
            <button
              disabled={!csvData}
              onClick={() => csvData && setStep(3)}
              className={`flex flex-col items-center gap-2 group focus:outline-none ${csvData ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                step === 3 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20 scale-110' 
                  : csvData 
                  ? 'bg-slate-800 border-slate-700 text-slate-300' 
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}>
                3
              </div>
              <span className={`text-xs font-semibold tracking-wide uppercase transition-colors duration-300 ${
                step === 3 ? 'text-blue-400' : csvData ? 'text-slate-300' : 'text-slate-500'
              }`}>
                Realizar Predicciones
              </span>
            </button>
          </div>
        </div>

        {/* Step Views */}
        <div className="w-full flex-1 flex flex-col justify-start">
          
          {/* Step 1: Upload dataset */}
          {step === 1 && (
            <div className="flex flex-col gap-6 py-6 items-center">
              <div className="text-center max-w-lg mb-4">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
                  Entrena tu Modelo de Entrega
                </h2>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  Sube un archivo CSV con tus registros históricos de envío. El sistema realizará un LabelEncoding automático y entrenará un regresor Random Forest en tiempo real.
                </p>
              </div>
              <UploadZone onSuccess={handleUploadSuccess} />
            </div>
          )}

          {/* Step 2: Preview + Metrics + Feature Importance */}
          {step === 2 && csvData && metrics && (
            <div className="flex flex-col gap-8 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/40 p-5 rounded-2xl border border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-white">Métricas y Análisis de Entrenamiento</h2>
                  <p className="text-xs text-slate-400 mt-1">Resultados de la evaluación con split 80% entrenamiento / 20% prueba.</p>
                </div>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
                >
                  Ir a Realizar Predicción 🔮
                </button>
              </div>

              <MetricsPanel 
                mae={metrics.mae} 
                rmse={metrics.rmse} 
                r2={metrics.r2} 
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <FeatureImportance featureImportances={featureImportances} />
                <DataPreview headers={csvData.headers} rows={csvData.rows} />
              </div>
            </div>
          )}

          {/* Step 3: Predict new order */}
          {step === 3 && csvData && (
            <div className="flex flex-col gap-8 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-800/40 p-5 rounded-2xl border border-slate-800">
                <div>
                  <h2 className="text-xl font-bold text-white">Generador de Predicciones</h2>
                  <p className="text-xs text-slate-400 mt-1">Completa las características del envío para calcular el tiempo estimado de entrega.</p>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 border border-slate-700 hover:border-slate-600 rounded-lg text-sm font-medium text-slate-300 hover:text-white transition cursor-pointer"
                >
                  ← Ver Métricas
                </button>
              </div>

              <PredictForm onPredict={handlePredictionSuccess} />

              {prediction && (
                <PredictionOutput 
                  prediccion_horas={prediction.prediccion_horas} 
                  prediccion_dias={prediction.prediccion_dias} 
                />
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 bg-slate-900 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 Predicciones de Entrega. Desarrollado con NestJS + React + Tailwind CSS v4.</p>
        </div>
      </footer>
    </div>
  );
}
