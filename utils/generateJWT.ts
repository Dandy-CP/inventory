import jwt from 'jsonwebtoken';
import { User } from '@/types/user/user.types';

const generateJWT = (authResponse: User) => {
  const accessToken = jwt.sign(
    { id: authResponse.id, name: authResponse.name },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  );

  const refreshToken = jwt.sign(
    { id: authResponse.id, name: authResponse.name },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: '10d' }
  );

  return {
    accessToken,
    refreshToken,
  };
};

export default generateJWT;
