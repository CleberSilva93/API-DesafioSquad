import { Router } from 'express';
import users from '../modules/users/infra/http/routes/users.routes';

const routes = Router();
routes.use('/', users);

export default routes;
