import { cpSync, rmSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'backend', 'dist');
const dest = join(root, 'api', 'nest-dist');

if (!existsSync(src)) {
  console.error('Falta backend/dist. Ejecuta: npm run build --prefix backend');
  process.exit(1);
}

rmSync(dest, { recursive: true, force: true });
cpSync(src, dest, { recursive: true });
console.log('Backend copiado a api/nest-dist');
