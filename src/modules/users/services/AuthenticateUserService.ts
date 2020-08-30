import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/schemas/User';
import AppError from '../../../errors/AppError';

import authConfig from '../../../config/auth';
import IUserRepository from '../repositories/IUserRepository';

interface Request {
  email: string;
  senha: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private users: IUserRepository,
  ) {}

  public async execute({ email, senha }: Request): Promise<Response> {
    const user = await this.users.findByEmail(email);

    if (user) {
      user.last_at = new Date();
    }
    if (!user?.senha) {
      throw new AppError('Usuário e/ou senha inválidos', 403);
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
