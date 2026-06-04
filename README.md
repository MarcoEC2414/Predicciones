# Predicciones - Random Forest Regressor

Este proyecto es una aplicación web full-stack diseñada para predecir el tiempo de entrega de pedidos (`TiempoEntregaHoras`) utilizando un modelo de Machine Learning (Random Forest) entrenado en tiempo real en el backend.

---

## 🛠 Stack Tecnológico

*   **Backend**: NestJS, Node.js, TypeScript, `ml-random-forest` y `papaparse`.
*   **Frontend**: React, Vite, Tailwind CSS v4.

---

## 🚀 Instalación y Ejecución

Sigue estos pasos para levantar el entorno de desarrollo local:

### 1. Backend

1. Entra a la carpeta `backend`:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo en el puerto `3000`:
   ```bash
   npm run start
   ```

### 2. Frontend

1. Abre otra terminal y entra a la carpeta `frontend`:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo en el puerto `5173`:
   ```bash
   npm run dev
   ```

Abre tu navegador en [http://localhost:5173](http://localhost:5173).

---

## 📊 Dataset de Prueba

Se incluye el archivo `datos_pedido.csv` en la raíz del proyecto para que puedas probar la aplicación de inmediato. Este archivo contiene 50 registros realistas con las siguientes variables:

*   **Variables de entrada (Features)**:
    *   `DistanciaKm`
    *   `CantidadCajas`
    *   `Peso (Kg)`
    *   `TipoProducto`
    *   `TiempoProduccionHoras`
    *   `Tiempo Embalaje (Horas)`
    *   `Tiempo Carga (Horas)`
    *   `Zona`
    *   `DiaSemana`
    *   `HoraPedido`
    *   `ClienteRecurrente`
    *   `Tipo Vehiculo`
*   **Variable objetivo (Target)**:
    *   `TiempoEntregaHoras`
