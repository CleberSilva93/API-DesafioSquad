import { Router } from 'express';

// import signInRouter from '../modules/signIn/infra/http/routes/signInRouter';
// import signin from '@modules/users/infra/http/routes/signin.routes';
// import signup from '../modules/users/infra/http/routes/signup.routes';
import users from '../modules/users/infra/http/routes/users.routes';

const routes = Router();

// routes.use('/signin', signInRouter);
routes.use('/signup', users);
routes.use('/user', users);
routes.use('/signin', users);

export default routes;
