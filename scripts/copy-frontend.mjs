import { cpSync, mkdirSync, rmSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'frontend', 'dist');
const dest = join(root, 'backend', 'public');

if (!existsSync(src)) {
  console.error('No se encontró frontend/dist. Ejecuta primero: npm run build --prefix frontend');
  process.exit(1);
}

rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
console.log('Frontend copiado a backend/public');
