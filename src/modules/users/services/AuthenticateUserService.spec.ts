import FakeUserRepository from '../infra/typeorm/repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUser from './CreateUser';
import AppError from '../../../errors/AppError';

let fakeUserRepository: FakeUserRepository;
let authenticateUserService: AuthenticateUserService;
let createUser: CreateUser;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    authenticateUserService = new AuthenticateUserService(fakeUserRepository);
    createUser = new CreateUser(fakeUserRepository);
  });

  it('should be able to create a new authentication', async () => {
    await createUser.execute({
      nome: 'Cleber',
      email: 'isabela.mondini123@gmail.com',
      senha: 'cleber23',
      telefone: '34254079',
      created_at: new Date(),
      last_at: new Date(),
      update_at: new Date(),
    });
    expect(
      authenticateUserService.execute({
        email: 'isabela.mondini123@gmail.com',
        senha: 'cleber23',
      }),
    );
  });
  it('should not be able to create a new authentication', async () => {
    await createUser.execute({
      nome: 'Cleber',
      email: 'isabela.mondini123@gmail.com',
      senha: 'cleber23',
      telefone: '34254079',
      created_at: new Date(),
      last_at: new Date(),
      update_at: new Date(),
    });
    await expect(
      authenticateUserService.execute({
        email: 'isabela.mondini123@gmail.com',
        senha: 'cleber2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new authentication without the password', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'isabela.mondini123@gmail.com',
        senha: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
