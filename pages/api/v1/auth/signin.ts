import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import prisma from '@/config/prisma';
import { generateJWT } from '@/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;

    if (method === 'POST') {
      const { body } = req;

      const userInDB = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (!userInDB) {
        return res.status(401).json({
          message: 'Wrong Email Or Password',
        });
      }

      if (userInDB) {
        const isPasswordMatch = await bcrypt.compare(
          body.password,
          userInDB.password
        );

        if (!isPasswordMatch) {
          return res.status(401).json({
            message: 'Wrong Email Or Password',
          });
        }

        if (isPasswordMatch) {
          const { accessToken, refreshToken } = generateJWT(userInDB);

          return res.status(200).json({
            accessToken,
            refreshToken,
          });
        }
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ name: 'Internal Server Error' });
  }
}
