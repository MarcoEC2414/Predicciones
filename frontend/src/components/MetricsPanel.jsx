import React from 'react';

export default function MetricsPanel({ mae, rmse, r2 }) {
  // Clamp R² for progress bar display
  const r2Percentage = Math.max(0, Math.min(100, (r2 || 0) * 100));

  const formatNumber = (num) => {
    if (num === undefined || num === null) return '0.00';
    return Number(num).toFixed(4);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {/* MAE Card */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg flex flex-col justify-between hover:border-slate-600 transition">
        <div>
          <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">MAE</span>
          <h4 className="text-sm font-medium text-slate-300 mt-1">Error Absoluto Medio</h4>
        </div>
        <div className="mt-4">
          <span className="text-3xl font-bold text-white font-mono">
            {formatNumber(mae)}
          </span>
          <p className="text-xs text-slate-400 mt-2">
            Promedio de la diferencia absoluta entre la predicción y el valor real (en horas).
          </p>
        </div>
      </div>

      {/* RMSE Card */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg flex flex-col justify-between hover:border-slate-600 transition">
        <div>
          <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">RMSE</span>
          <h4 className="text-sm font-medium text-slate-300 mt-1">Error Cuadrático Medio Raíz</h4>
        </div>
        <div className="mt-4">
          <span className="text-3xl font-bold text-white font-mono">
            {formatNumber(rmse)}
          </span>
          <p className="text-xs text-slate-400 mt-2">
            Penaliza los errores más grandes. Mide la desviación estándar de los residuos (en horas).
          </p>
        </div>
      </div>

      {/* R² Card */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg flex flex-col justify-between hover:border-slate-600 transition">
        <div>
          <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">R² (Score)</span>
          <h4 className="text-sm font-medium text-slate-300 mt-1">Coeficiente de Determinación</h4>
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-3xl font-bold text-green-400 font-mono">
              {formatNumber(r2)}
            </span>
            <span className="text-xs text-slate-400">
              {r2Percentage.toFixed(1)}% precisión
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden mb-2">
            <div 
              style={{ width: `${r2Percentage}%` }}
              className="bg-gradient-to-r from-blue-500 to-green-400 h-full rounded-full transition-all duration-1000 ease-out"
            ></div>
          </div>
          
          <p className="text-xs text-slate-400">
            Proporción de la varianza en el tiempo de entrega explicada por las características del modelo.
          </p>
        </div>
      </div>
    </div>
  );
}
