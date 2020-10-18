import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CategoriesController from '../controllers/CategoriesController';

const categoriesRoute = Router();
const categoriesController = new CategoriesController();

categoriesRoute.use(ensureAuthenticated);
categoriesRoute.post('/', categoriesController.create);
categoriesRoute.put('/', categoriesController.update);
categoriesRoute.get('/', categoriesController.index);
categoriesRoute.get('/:id', categoriesController.show);
export default categoriesRoute;
