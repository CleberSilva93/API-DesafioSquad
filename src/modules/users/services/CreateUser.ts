/* eslint-disable no-useless-constructor */
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../errors/AppError';
import User from '../infra/typeorm/schemas/User';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  nome: string;
  senha: string;
  email: string;
  last_at: Date;
  telefone: string;
  created_at: Date;
  update_at: Date;
}

@injectable()
class CreateUser {
  constructor(
    @inject('UserRepository')
    private users: IUserRepository,
  ) {}

  public async execute({
    nome,
    senha,
    email,
    telefone,
  }: IRequest): Promise<User | null> {
    const checkUserExists = await this.users.findByEmail(email);
    if (checkUserExists) {
      throw new AppError('E=mail já existente.');
    }

    const hashSenha = await hash(senha, 8);
    const user = await this.users.create({
      nome,
      senha: hashSenha,
      last_at: new Date(),
      email,
      telefone,
    });
    return user;
  }
}

export default CreateUser;
