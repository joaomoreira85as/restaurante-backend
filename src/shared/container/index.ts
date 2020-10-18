import { container } from 'tsyringe';
import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRespository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRespository';
import CompaniesRepository from '@modules/companies/infra/typeorm/repositories/CompaniesRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRespository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import './providers';

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  CompaniesRepository,
);
