import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getServerlessHandler } from '../backend/dist/serverless';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const server = await getServerlessHandler();
  return server(req, res);
}
