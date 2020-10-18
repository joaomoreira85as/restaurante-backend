import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import UserAvatarController from '../controllers/UserAvatarController';
import UsersController from '../controllers/UsersController';

const upload = multer(uploadConfig.multer);
const usersRoute = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRoute.post('/', usersController.create);
usersRoute.use(ensureAuthenticated);
usersRoute.put('/', usersController.update);
usersRoute.get('/', usersController.index);
usersRoute.get('/:id', usersController.show);
usersRoute.patch(
  '/avatar',
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRoute;
