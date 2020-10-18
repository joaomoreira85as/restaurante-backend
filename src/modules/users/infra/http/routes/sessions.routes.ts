import { Router } from 'express';
import SessionsController from '@modules/users/infra/http/controllers/SessionsController';

const usersRoute = Router();

const sessionsController = new SessionsController();

usersRoute.post('/', sessionsController.create);

export default usersRoute;
