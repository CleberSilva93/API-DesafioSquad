import { Router } from 'express';

import AuthenticateUserService from '../../../services/AuthenticateUserService';

const signin = Router();

signin.post('/', async (request, response) => {
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
    return response.status(err.statusCode).json({ error: err.message });
  }
});

export default signin;
