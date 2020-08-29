import { getMongoRepository, MongoRepository, Not } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../schemas/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: MongoRepository<User>;

  constructor() {
    console.log('chega aqui?22:');
    this.ormRepository = getMongoRepository(User);
    console.log('chega aqui?223:');
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByName(nome: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { nome },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    console.log('Chegou qui1');
    const appointment = this.ormRepository.create(userData);
    console.log('Chegou qui2');
    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default UsersRepository;
