import React from 'react';

export default function PredictionOutput({ prediccion_horas, prediccion_dias }) {
  if (prediccion_horas === undefined || prediccion_horas === null) {
    return null;
  }

  // Determine status color and text based on ranges:
  // Verde (< 24h = Rápido), Amarillo (24-72h = Normal), Rojo (> 72h = Lento)
  let statusText = 'Rápido';
  let badgeColor = 'bg-green-500/10 text-green-400 border-green-500/30';
  let glowColor = 'shadow-green-500/10 border-green-500/20';
  let textColor = 'text-green-400';

  if (prediccion_horas >= 24 && prediccion_horas <= 72) {
    statusText = 'Normal';
    badgeColor = 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
    glowColor = 'shadow-yellow-500/10 border-yellow-500/20';
    textColor = 'text-yellow-400';
  } else if (prediccion_horas > 72) {
    statusText = 'Lento';
    badgeColor = 'bg-red-500/10 text-red-400 border-red-500/30';
    glowColor = 'shadow-red-500/10 border-red-500/20';
    textColor = 'text-red-400';
  }

  const formatValue = (val) => {
    return Number(val).toFixed(2);
  };

  return (
    <div className={`w-full bg-slate-800 border border-slate-700 rounded-2xl p-6 md:p-8 shadow-2xl transition-all duration-500 ${glowColor} flex flex-col md:flex-row items-center justify-between gap-6`}>
      <div className="flex-1 text-center md:text-left">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${badgeColor} mb-3`}>
          ● Envio {statusText}
        </span>
        <h3 className="text-xl font-bold text-white mb-2">Resultado de la Predicción</h3>
        <p className="text-sm text-slate-400 max-w-md">
          El modelo de Random Forest estima que el pedido tardará aproximadamente el tiempo indicado según las condiciones suministradas.
        </p>
      </div>

      <div className="flex items-center gap-6 md:gap-10 shrink-0 bg-slate-900/40 p-5 rounded-xl border border-slate-700/50">
        {/* Hours Column */}
        <div className="text-center">
          <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase block mb-1">Horas</span>
          <span className={`text-4xl md:text-5xl font-extrabold font-mono ${textColor}`}>
            {formatValue(prediccion_horas)}
          </span>
        </div>

        {/* Separator Line */}
        <div className="h-12 w-[1px] bg-slate-700"></div>

        {/* Days Column */}
        <div className="text-center">
          <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase block mb-1">Días</span>
          <span className="text-4xl md:text-5xl font-extrabold font-mono text-white">
            {formatValue(prediccion_dias)}
          </span>
        </div>
      </div>
    </div>
  );
}
