import { getRepository, ObjectID } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/schemas/User';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import AppError from '../../../errors/AppError';

import authConfig from '../../../config/auth';

interface Request {
  email: string;
  senha: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  private users = new UserRepository();

  public async execute({ email, senha }: Request): Promise<Response> {
    const user = await this.users.findByEmail(email);

    if (user) {
      user.last_at = new Date();
    }

    if (!user) {
      throw new AppError('Usuário e/ou senha inválidos', 403);
    }

    const passwordMatched = await compare(senha, user.senha);

    if (!passwordMatched) {
      throw new AppError('Usuário e/ou senha inválidos', 403);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.email,
      expiresIn,
    });
    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
