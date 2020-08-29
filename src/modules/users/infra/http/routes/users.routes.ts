import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import { getRepository } from 'typeorm';
import CreateUser from '../../../services/CreateUser';
import ListUser from '../../../services/ListUser';
import AuthenticateUserService from '../../../services/AuthenticateUserService';
import User from '../../typeorm/schemas/User';
import UsersRepository from '../../typeorm/repositories/UserRepository';

const users = Router();

users.get('/g', async (request, response) => {
  try {
    const { name } = request.body;

    const listUser = new ListUser();

    const user = await listUser.execute(name);

    return user;
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

users.post(
  '/c',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      senha: Joi.string().required(),
      email: Joi.string().required(),
      telefone: Joi.string().required(),
    },
  }),
  async (request, response) => {
    console.log('Chega até aq?');
    try {
      const { nome, senha, email, telefone } = request.body;
      const createUser = new CreateUser();
      console.log('Chega até aq?2');
      const user = await createUser.execute({
        nome,
        email,
        telefone,
        senha,
        created_at: new Date(),
        update_at: new Date(),
        last_at: new Date(),
      });

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

users.post('/a', async (request, response) => {
  try {
    const { email, senha } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      email,
      senha,
    });

    // delete user.senha;
    response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default users;
