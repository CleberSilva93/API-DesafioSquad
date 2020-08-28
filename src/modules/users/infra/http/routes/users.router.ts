import { Router, request, response } from 'express';

import ListUser from '@modules/users/services/ListUser';
import { celebrate, Segments, Joi } from 'celebrate';
import { getRepository } from 'typeorm';
import User from '../../typeorm/schemas/User';
import UsersRepository from '../../typeorm/repositories/UserRepository';

const users = Router();

// users.post(
//   '/',
//   celebrate({
//     [Segments.BODY]: {
//       nome: Joi.string().required(),
//       senha: Joi.string().required(),
//       email: Joi.string().required(),
//       telefone: Joi.string().required(),
//     },
//   }),
//   async (request, response) => {
//     try {
//       const { nome, senha, email, telefone } = request.body;
//       const users = new CreateUser();

//       const user = await users.execute({
//         nome,
//         email,
//         telefone,
//         senha,
//         created_at: new Date(),
//         update_at: new Date(),
//         last_at: new Date(),
//       });

//       return response.json(user);
//     } catch (err) {
//       return response.status(err.statusCode).json({ error: err.message });
//     }
//   },

users.get('/', async (request, response) => {
  try {
    const { name } = request.body;

    const listUser = new ListUser();

    const user = await listUser.execute(name);

    return user;
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

export default users;
