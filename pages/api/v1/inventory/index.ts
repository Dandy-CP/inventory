import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getListInventory,
  createInventory,
  updateInventory,
  deleteInventory,
} from '@/controllers/inventory';
import { authGuard } from '@/controllers/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  try {
    await authGuard(req, res);

    if (method === 'GET') {
      await getListInventory(req, res);
    }

    if (method === 'POST') {
      await createInventory(req, res);
    }

    if (method === 'PUT') {
      await updateInventory(req, res);
    }

    if (method === 'DELETE') {
      await deleteInventory(req, res);
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
