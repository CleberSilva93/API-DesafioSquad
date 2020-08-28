import User from '@modules/users/infra/typeorm/schemas/User';
import { getCustomRepository } from 'typeorm';
import AppError from 'errors/AppError';
import UserRepository from '../infra/typeorm/repositories/UserRepository';

interface IRequest {
  nome: string;
}

class ListUser {
  private users = getCustomRepository(UserRepository);

  public async execute({ nome }: IRequest): Promise<User | undefined> {
    const user = await this.users.findByName(nome);

    if (!user) {
      throw new AppError('');
    }
    return user;
  }
}

export default ListUser;
