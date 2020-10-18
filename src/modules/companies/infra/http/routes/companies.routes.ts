import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import CompanyLogoController from '../controllers/CompanyLogoController';
import CompaniesController from '../controllers/CompaniesController';

const upload = multer(uploadConfig.multer);
const companiesRoute = Router();
const companiesController = new CompaniesController();
const userAvatarController = new CompanyLogoController();

companiesRoute.get('/', companiesController.index);
companiesRoute.get('/:id', companiesController.show);
companiesRoute.post('/', companiesController.create);
companiesRoute.put('/', companiesController.update);
companiesRoute.delete('/', companiesController.delete);
companiesRoute.patch(
  '/logo',
  upload.single('logo'),
  userAvatarController.update,
);

export default companiesRoute;
