import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '@/config/prisma';
import { generateJWT } from '@/utils';

export const signIn = async (req: NextApiRequest, res: NextApiResponse) => {
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
};

export const signUp = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(body.password, salt);

  const userInDB = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (userInDB) {
    return res.status(422).json({
      message: 'User has been registered',
    });
  }

  await prisma.user
    .create({
      data: {
        name: body.name,
        email: body.email,
        password: hashPassword,
      },
    })
    .then((data) => {
      return res.status(200).json({
        message: 'Success Signup',
        name: data.name,
        email: data.email,
      });
    });
};

export const authGuard = async (req: NextApiRequest, res: NextApiResponse) => {
  const { headers } = req;
  const { authorization } = headers;
  const token = authorization?.split(' ')[1];

  const isTokenExpired = (token: string) => {
    const arrayToken = token.split('.');
    const tokenPayload = JSON.parse(atob(arrayToken[1]));

    return Math.floor(new Date().getTime() / 1000) >= tokenPayload?.exp;
  };

  if (!authorization) {
    return res.status(403).json({
      message: 'A token is required for authentication',
    });
  }

  if (token && isTokenExpired(token)) {
    return res.status(403).json({
      message: 'Token Is Expired',
    });
  }

  jwt.verify(
    token!,
    process.env.JWT_SECRET!,
    { algorithms: ['HS256'] },
    (error) => {
      if (error) {
        console.log(error);

        return res.status(403).json({
          message: error.message,
        });
      }
    }
  );
};
