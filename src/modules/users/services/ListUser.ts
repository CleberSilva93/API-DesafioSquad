import { injectable, inject } from 'tsyringe';
import AppError from '../../../errors/AppError';
import User from '../infra/typeorm/schemas/User';
import IUserRepository from '../repositories/IUserRepository';

@injectable()
class ListUser {
  constructor(
    @inject('UserRepository')
    private users: IUserRepository,
  ) {}

  public async execute(id: string): Promise<User | undefined> {
    const user = await this.users.findById(id);
    if (!user) {
      throw new AppError(' Usuário não existente');
    }
    return user;
  }
}

export default ListUser;
