import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getListCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/controllers/category';
import { authGuard } from '@/controllers/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  try {
    await authGuard(req, res);

    if (method === 'GET') {
      await getListCategory(req, res);
    }

    if (method === 'POST') {
      await createCategory(req, res);
    }

    if (method === 'PUT') {
      await updateCategory(req, res);
    }

    if (method === 'DELETE') {
      await deleteCategory(req, res);
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
