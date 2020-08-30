// import FakeNotificationsRepository from '@modules/notification/repositories/fakes/FakeNotificationsRepository';
import FakeUserRepository from '../infra/typeorm/repositories/fakes/FakeUserRepository';
import CreateUser from './CreateUser';

let fakeUserRepository: FakeUserRepository;
let createUser: CreateUser;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    createUser = new CreateUser(fakeUserRepository);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      nome: 'Cleber',
      email: 'isabela.mondini123@gmail.com',
      senha: 'cleber23',
      telefone: '34254079',
      created_at: new Date(),
      last_at: new Date(),
      update_at: new Date(),
    });
    expect(user).toHaveProperty('nome');
  });
});
