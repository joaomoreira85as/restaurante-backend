import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductsController from '../controllers/ProductsController';

const productsRoute = Router();
const productsController = new ProductsController();

productsRoute.use(ensureAuthenticated);
productsRoute.post('/', productsController.create);
productsRoute.put('/', productsController.update);
productsRoute.get('/', productsController.index);
productsRoute.get('/:id', productsController.show);
export default productsRoute;
