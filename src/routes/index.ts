import { Router } from 'express';

// import signInRouter from '../modules/signIn/infra/http/routes/signInRouter';
import sessionsRouter from '@modules/users/routes/sessions.routes;
import signUpRouter from '../modules/users/routes/signUpRouter;

const routes = Router();

// routes.use('/signin', signInRouter);
routes.use('/signUp', signUpRouter);
routes.use('/auth', sessionsRouter);

export default routes;
