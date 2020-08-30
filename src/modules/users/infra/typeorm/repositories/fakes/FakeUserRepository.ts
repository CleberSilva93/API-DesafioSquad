import IUsersRepository from '@modules/users/repositories/IUserRepository';
import User from '../../schemas/User';

interface IUser {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
}

class FakeUserRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const userId = await this.users.find(user => {
      if (user.id) {
        if (user.id.toString() === id) {
          return user;
        }
      }
    });

    return userId;
  }

  public async findByName(nome: string): Promise<User | undefined> {
    const userNome = await this.users.find(user => user.nome === nome);

    return userNome;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const userEmail = this.users.find(user => user.email === email);

    return userEmail;
  }

  public async create({ nome, email, senha, telefone }: IUser): Promise<User> {
    const user = new User();
    user.email = email;
    user.nome = nome;
    user.senha = senha;
    user.telefone = telefone;
    user.created_at = new Date();
    user.last_at = new Date();
    user.updated_at = new Date();

    this.users.push(user);

    return user;
  }
}

export default FakeUserRepository;
