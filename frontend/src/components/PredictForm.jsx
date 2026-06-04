import React, { useState } from 'react';
import { predict } from '../services/api';

export default function PredictForm({ onPredict }) {
  const [formData, setFormData] = useState({
    DistanciaKm: 120,
    CantidadCajas: 15,
    'Peso (Kg)': 45,
    TipoProducto: 'Electrónico',
    TiempoProduccionHoras: 4,
    'Tiempo Embalaje (Horas)': 1.5,
    'Tiempo Carga (Horas)': 1.0,
    Zona: 'Norte',
    DiaSemana: 'Lunes',
    HoraPedido: 'Mañana',
    ClienteRecurrente: 'Si',
    'Tipo Vehiculo': 'Furgoneta',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const result = await predict(formData);
      if (onPredict) {
        onPredict(result);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Error al calcular la predicción. ¿El modelo fue entrenado?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <span>📦</span> Ingresar Datos del Pedido
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* DistanciaKm */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-400 mb-1.5 uppercase">
              Distancia (Km)
            </label>
            <input
              type="number"
              name="DistanciaKm"
              value={formData.DistanciaKm}
              onChange={handleChange}
              min="0"
              required
              className="bg-slate-700 border border-slate-600 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* CantidadCajas */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-400 mb-1.5 uppercase">
              Cantidad de Cajas
            </label>
            <input
              type="number"
              name="CantidadCajas"
              value={formData.CantidadCajas}
              onChange={handleChange}
              min="0"
              required
              className="bg-slate-700 border border-slate-600 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Peso (Kg) */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-400 mb-1.5 uppercase">
              Peso (Kg)
            </label>
            <input
              type="number"
              name="Peso (Kg)"
              value={formData['Peso (Kg)']}
              onChange={handleChange}
              min="0"
              required
              className="bg-slate-700 border border-slate-600 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* TipoProducto */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-400 mb-1.5 uppercase">
              Tipo de Producto
            </label>
            <select
              name="TipoProducto"
              value={formData.TipoProducto}
              onChange={handleChange}
              className="bg-slate-700 border border-slate-600 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
            >
              <option value="Electrónico">Electrónico</option>
              <option value="Ropa">Ropa</option>
              <option value="Alimento">Alimento</option>
              <option value="Mueble">Mueble</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          {/* TiempoProduccionHoras */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-400 mb-1.5 uppercase">
              Tiempo de Producción (Horas)
            </label>
            <input
              type="number"
              name="TiempoProduccionHoras"
              value={formData.TiempoProduccionHoras}
              onChange={handleChange}
              min="0"
              step="0.1"
              required
              className="bg-slate-700 border border-slate-600 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Tiempo Embalaje (Horas) */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-400 mb-1.5 uppercase">
              Tiempo de Embalaje (Horas)
            </label>
            <input
              type="number"
              name="Tiempo Embalaje (Horas)"
              value={formData['Tiempo Embalaje (Horas)']}
              onChange={handleChange}
              min="0"
              step="0.1"
              required
              className="bg-slate-700 border border-slate-600 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Tiempo Carga (Horas) */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-400 mb-1.5 uppercase">
              Tiempo de Carga (Horas)
            </label>
            <input
              type="number"
              name="Tiempo Carga (Horas)"
              value={formData['Tiempo Carga (Horas)']}
              onChange={handleChange}
              min="0"
              step="0.1"
              required
              className="bg-slate-700 border border-slate-600 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Zona */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-400 mb-1.5 uppercase">
              Zona Destino
            </label>
            <select
              name="Zona"
              value={formData.Zona}
              onChange={handleChange}
              className="bg-slate-700 border border-slate-600 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
            >
              <option value="Norte">Norte</option>
              <option value="Sur">Sur</option>
              <option value="Este">Este</option>
              <option value="Oeste">Oeste</option>
              <option value="Centro">Centro</option>
            </select>
          </div>

          {/* DiaSemana */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-400 mb-1.5 uppercase">
              Día de la Semana
            </label>
            <select
              name="DiaSemana"
              value={formData.DiaSemana}
              onChange={handleChange}
              className="bg-slate-700 border border-slate-600 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
            >
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miércoles">Miércoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
              <option value="Sábado">Sábado</option>
              <option value="Domingo">Domingo</option>
            </select>
          </div>

          {/* HoraPedido */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-400 mb-1.5 uppercase">
              Hora del Pedido
            </label>
            <select
              name="HoraPedido"
              value={formData.HoraPedido}
              onChange={handleChange}
              className="bg-slate-700 border border-slate-600 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
            >
              <option value="Mañana">Mañana</option>
              <option value="Tarde">Tarde</option>
              <option value="Noche">Noche</option>
            </select>
          </div>

          {/* ClienteRecurrente */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-400 mb-1.5 uppercase">
              Cliente Recurrente
            </label>
            <select
              name="ClienteRecurrente"
              value={formData.ClienteRecurrente}
              onChange={handleChange}
              className="bg-slate-700 border border-slate-600 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
            >
              <option value="Si">Sí</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Tipo Vehiculo */}
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-slate-400 mb-1.5 uppercase">
              Tipo de Vehículo
            </label>
            <select
              name="Tipo Vehiculo"
              value={formData['Tipo Vehiculo']}
              onChange={handleChange}
              className="bg-slate-700 border border-slate-600 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
            >
              <option value="Moto">Moto</option>
              <option value="Auto">Auto</option>
              <option value="Camión">Camión</option>
              <option value="Furgoneta">Furgoneta</option>
            </select>
          </div>
        </div>

        {errorMsg && (
          <div className="text-sm text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            ⚠ {errorMsg}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <span className="animate-spin inline-block border-2 border-white/30 border-t-white rounded-full w-4 h-4"></span>
                Calculando...
              </>
            ) : (
              <>
                <span>🔮</span>
                Predecir Tiempo de Entrega
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
