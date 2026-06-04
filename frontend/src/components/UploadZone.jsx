import React, { useState, useRef } from 'react';
import { uploadAndTrain } from '../services/api';

export default function UploadZone({ onSuccess }) {
  const [status, setStatus] = useState('idle'); // idle | uploading | success | error
  const [fileName, setFileName] = useState('');
  const [totalRows, setTotalRows] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = async (file) => {
    if (!file) return;
    if (!file.name.endsWith('.csv')) {
      setStatus('error');
      setErrorMsg('Por favor, selecciona un archivo CSV válido.');
      return;
    }

    setFileName(file.name);
    setStatus('uploading');
    setErrorMsg('');

    try {
      const data = await uploadAndTrain(file);
      setStatus('success');
      setTotalRows(data.total);
      if (onSuccess) {
        onSuccess(data);
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg(err.message || 'Ocurrió un error al procesar y entrenar el modelo.');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center p-8 md:p-12 border-2 border-dashed rounded-2xl transition-all duration-300 bg-slate-800/50 backdrop-blur-md ${
          dragActive
            ? 'border-blue-500 bg-blue-500/10 scale-[1.02]'
            : status === 'success'
            ? 'border-green-500 bg-green-500/5'
            : status === 'error'
            ? 'border-red-500 bg-red-500/5'
            : 'border-slate-700 hover:border-slate-500 hover:bg-slate-800/70'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".csv"
          onChange={handleChange}
        />

        {/* Icon based on status */}
        <div className="mb-4 text-5xl">
          {status === 'idle' && (
            <span className="text-slate-400">📁</span>
          )}
          {status === 'uploading' && (
            <span className="animate-spin inline-block text-blue-500">⏳</span>
          )}
          {status === 'success' && (
            <span className="text-green-400">✅</span>
          )}
          {status === 'error' && (
            <span className="text-red-400">❌</span>
          )}
        </div>

        {status === 'idle' && (
          <div className="text-center">
            <p className="text-lg font-medium text-white mb-2">
              Arrastra tu dataset CSV aquí
            </p>
            <p className="text-sm text-slate-400 mb-6">
              o selecciona un archivo desde tu equipo
            </p>
            <button
              onClick={onButtonClick}
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition duration-150 ease-in-out cursor-pointer"
            >
              Seleccionar Archivo
            </button>
          </div>
        )}

        {status === 'uploading' && (
          <div className="text-center">
            <p className="text-lg font-medium text-white mb-2">
              Subiendo y Entrenando...
            </p>
            <p className="text-sm text-slate-400 mb-4">
              {fileName}
            </p>
            <div className="w-48 bg-slate-700 h-1.5 rounded-full overflow-hidden mx-auto">
              <div className="bg-blue-500 h-full animate-[loading_1.5s_infinite_linear] w-1/3 rounded-full"></div>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <p className="text-lg font-medium text-green-400 mb-2">
              ¡Modelo Entrenado con Éxito!
            </p>
            <p className="text-sm text-slate-200 font-semibold mb-1">
              {fileName}
            </p>
            <p className="text-xs text-slate-400 mb-6">
              {totalRows} filas cargadas y procesadas
            </p>
            <button
              onClick={onButtonClick}
              className="px-5 py-2 border border-slate-600 hover:border-slate-500 text-slate-300 font-medium rounded-lg hover:text-white transition duration-150 cursor-pointer"
            >
              Subir otro archivo
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <p className="text-lg font-medium text-red-400 mb-2">
              Error de carga
            </p>
            <p className="text-sm text-slate-300 mb-4 max-w-md mx-auto">
              {errorMsg}
            </p>
            <button
              onClick={onButtonClick}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition duration-150 cursor-pointer"
            >
              Reintentar
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
