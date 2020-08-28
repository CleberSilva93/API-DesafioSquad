import { Router } from 'express';

import ListUser from '@modules/users/services/ListUser';
import { celebrate, Segments, Joi } from 'celebrate';
import { getRepository } from 'typeorm';
import User from '../../typeorm/schemas/User';
import UsersRepository from '../../typeorm/repositories/UserRepository';

const users = Router();

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
