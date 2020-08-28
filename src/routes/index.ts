import { Router } from 'express';

// import signInRouter from '../modules/signIn/infra/http/routes/signInRouter';
import sessionsRouter from '@modules/users/infra/http/routes/signin.routes';
import signUpRouter from '../modules/users/infra/http/routes/signup.routes';
import usersRouter from '../modules/users/infra/http/routes/users.router';

const routes = Router();

// routes.use('/signin', signInRouter);
routes.use('/signup', signUpRouter);
routes.use('/user', usersRouter);
routes.use('/signin', sessionsRouter);

export default routes;
