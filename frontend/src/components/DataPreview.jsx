import React from 'react';

export default function DataPreview({ headers, rows }) {
  if (!headers || headers.length === 0 || !rows || rows.length === 0) {
    return null;
  }

  // Tomamos los primeros 10 registros
  const previewRows = rows.slice(0, 10);

  return (
    <div className="w-full bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
      <div className="p-5 border-b border-slate-700 flex justify-between items-center bg-slate-800/80">
        <h3 className="text-lg font-semibold text-white">Vista previa de datos</h3>
        <span className="text-xs bg-slate-700 text-slate-300 px-3 py-1 rounded-full font-medium">
          Primeros 10 de {rows.length} registros
        </span>
      </div>
      
      <div className="overflow-x-auto max-h-[350px] overflow-y-auto">
        <table className="w-full text-left border-collapse text-sm text-slate-300">
          <thead className="bg-slate-900 sticky top-0 text-slate-200 uppercase font-semibold text-xs border-b border-slate-700">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-6 py-4 whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {previewRows.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className="hover:bg-slate-700/35 transition duration-150 ease-in-out odd:bg-slate-800/50 even:bg-slate-800/10"
              >
                {headers.map((header) => (
                  <td key={header} className="px-6 py-3.5 whitespace-nowrap">
                    {row[header] !== undefined && row[header] !== null 
                      ? String(row[header]) 
                      : <span className="text-slate-600 font-mono">-</span>
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
