import { Router } from 'express';
import { format } from 'date-fns';

import { celebrate, Segments, Joi } from 'celebrate';
import { container } from 'tsyringe';
import CreateUser from '../../../services/CreateUser';
import ListUser from '../../../services/ListUser';
import AuthenticateUserService from '../../../services/AuthenticateUserService';
import ensureAuthenticated from '../../../../../middlewares/ensureAuthenticated';

const users = Router();

users.get('/search/:id', ensureAuthenticated, async (request, response) => {
  try {
    const { id } = request.params;
    const listUser = container.resolve(ListUser);

    const user = await listUser.execute(id);
    return response.json({
      Nome: user?.nome,
      Email: user?.email,
      Last_at: user?.last_at
        ? format(user.last_at, "dd/MM/yyyy 'às' HH:mm")
        : undefined,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

users.post(
  '/signup',
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
      const createUser = container.resolve(CreateUser);
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

users.post('/signin', async (request, response) => {
  try {
    const { email, senha } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      senha,
    });

    response.status(201).json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default users;
