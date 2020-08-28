import { Router } from 'express';

import CreateUser from '@modules/users/services/CreateUser';
import { celebrate, Segments, Joi } from 'celebrate';
import { getRepository } from 'typeorm';
import User from '../../typeorm/schemas/User';
import UsersRepository from '../../typeorm/repositories/UserRepository';

const signUp = Router();

signUp.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      senha: Joi.string().required(),
      email: Joi.string().required(),
      telefone: Joi.string().required(),
    },
  }),
  async (request, response) => {
    try {
      const { nome, senha, email, telefone } = request.body;
      const users = new CreateUser();

      const user = await users.execute({
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
      return response.status(err.statusCode).json({ error: err.message });
    }
  },
);

export default signUp;
