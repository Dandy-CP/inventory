import type { NextApiRequest, NextApiResponse } from 'next';
import { signIn } from '@/controllers/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;

    if (method === 'POST') {
      await signIn(req, res);
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ name: 'Internal Server Error' });
  }
}
