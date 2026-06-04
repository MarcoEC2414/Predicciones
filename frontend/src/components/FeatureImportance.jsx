import React from 'react';

export default function FeatureImportance({ featureImportances }) {
  if (!featureImportances || featureImportances.length === 0) {
    return null;
  }

  // Calculate max importance for relative scaling if needed, 
  // but since importances are normalized (sum to 1.0), we can just use the raw percentage.
  // To make sure short bars are still visible, we can set a min-width of 1% or just draw them.
  const formatPercentage = (val) => {
    return `${(val * 100).toFixed(2)}%`;
  };

  return (
    <div className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <span>📊</span> Importancia de Características (Feature Importance)
      </h3>
      
      <div className="space-y-4">
        {featureImportances.map((item, index) => {
          const pct = item.importance * 100;
          return (
            <div key={item.feature} className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              {/* Feature Name */}
              <div className="w-full md:w-1/4 text-sm font-medium text-slate-300 group-hover:text-white transition">
                {item.feature}
              </div>
              
              {/* Importance Bar */}
              <div className="flex-1 flex items-center gap-3">
                <div className="flex-1 bg-slate-700 h-4 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${Math.max(1, pct)}%` }}
                    className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full transition-all duration-1000 ease-out group-hover:from-blue-500 group-hover:to-indigo-400"
                  ></div>
                </div>
                
                {/* Value label */}
                <div className="w-16 text-right text-xs font-mono font-bold text-slate-400 group-hover:text-blue-400 transition">
                  {formatPercentage(item.importance)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
