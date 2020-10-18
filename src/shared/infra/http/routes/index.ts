import { Router } from 'express';
import companiesRouter from '@modules/companies/infra/http/routes/companies.routes';
import categoriesRouter from '@modules/categories/infra/http/routes/categories.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/categories', categoriesRouter);
routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);
routes.use('/companies', companiesRouter);

export default routes;
