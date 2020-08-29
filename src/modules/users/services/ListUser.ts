import { getCustomRepository } from 'typeorm';
import AppError from '../../../errors/AppError';
import User from '../infra/typeorm/schemas/User';
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
