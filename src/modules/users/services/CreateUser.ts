/* eslint-disable no-undef */
import { getRepository, Repository, getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
// import AppError from 'errors/AppError';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import { response } from 'express';
import User from '../infra/typeorm/schemas/User';

interface IRequest {
  nome: string;
  senha: string;
  email: string;
  last_at: Date;
  telefone: string;
  created_at: Date;
  update_at: Date;
}

class CreateUser {
  private users = new UserRepository();

  public async execute({
    nome,
    senha,
    email,
    telefone,
  }: IRequest): Promise<User | null> {
    const checkUserExists = await this.users.findByEmail(email);
    if (checkUserExists) {
      return null;
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
