<div align="center">
  <img width="243" height="150" alt="arquitectura_predictor" src="https://github.com/user-attachments/assets/b389aae8-6a86-447d-8617-2aee0d1d08e8" />
  
  # 🎯 Predicciones - Random Forest Regressor
  
  *Aplicación web full-stack diseñada para predecir el tiempo de entrega de pedidos utilizando Machine Learning en tiempo real.*
</div>

---

## 📖 Descripción del Proyecto

Este sistema calcula de manera automatizada el `TiempoEntregaHoras` basándose en un modelo de **Random Forest Regressor** entrenado directamente en el backend mediante procesamiento de archivos planos. Ideal para optimizar la logística y estimación de tiempos de distribución.

---

## 🛠️ Stack Tecnológico

<div align="center">

| Componente | Tecnologías Utilizadas |
| :--- | :--- |
| **Backend** | NestJS • Node.js • TypeScript • `ml-random-forest` • `papaparse` |
| **Frontend** | React • Vite • Tailwind CSS v4 |

</div>

---

## 🚀 Instalación y Ejecución

Sigue estos pasos para levantar el entorno de desarrollo local:

### ⚙️ 1. Backend

1. Navega a la carpeta del servidor:
   ```bash
   cd backend
Instala los paquetes requeridos:

Bash
npm install
Inicia el servidor de desarrollo (correrá en el puerto 3000):

Bash
npm run start
💻 2. Frontend
Abre otra terminal independiente y navega a la interfaz:

Bash
cd frontend
Instala las dependencias:

Bash
npm install
Inicia el servidor de desarrollo de Vite (correrá en el puerto 5173):

Bash
npm run dev
🌐 Una vez levantados ambos servicios, abre tu navegador e ingresa a: http://localhost:5173

📊 Dataset de Prueba
Para facilitar las pruebas de inmediato, se incluye el archivo datos_pedido.csv en la raíz del proyecto con 50 registros realistas estructurados bajo el siguiente esquema:

📥 Variables de Entrada (Features)
Logística y Carga: DistanciaKm, CantidadCajas, Peso (Kg), Tipo Vehiculo

Tiempos Operativos: TiempoProduccionHoras, Tiempo Embalaje (Horas), Tiempo Carga (Horas)

Contexto del Pedido: TipoProducto, Zona, DiaSemana, HoraPedido, ClienteRecurrente

📤 Variable Objetivo (Target)
TiempoEntregaHoras (Valor numérico continuo a predecir)
