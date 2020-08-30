import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { differenceInMinutes } from 'date-fns';

import authConfig from '../config/auth';
import AppError from '../errors/AppError';
import UserRepository from '../modules/users/infra/typeorm/repositories/UserRepository';

interface tokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const users = new UserRepository();
  const authHeader = request.headers.authorization;
  const { id } = request.params;

  if (!authHeader) {
    throw new AppError('Não autorizado', 401);
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as tokenPayLoad;
    request.user = {
      id: sub,
    };

    const user = await users.findByEmail(sub);
    if (user?.id) {
      if (id !== user.id.toString()) {
        throw new AppError('Não autorizado.', 401);
      }
    }
    const compareDate = user?.last_at
      ? differenceInMinutes(user.last_at, new Date())
      : undefined;
    if (compareDate) {
      if (compareDate > 30) {
        throw new AppError('Sessão inválida', 401);
      }
    }
    return next();
  } catch (err) {
    if (err.message) {
      throw new AppError(err.message, 401);
    } else throw new AppError('Invalid token', 401);
  }
}
