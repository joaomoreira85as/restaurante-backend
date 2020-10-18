import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRespository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
  company_id: number;
  type: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('BcryptHashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    company_id,
    type,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);
    if (checkUserExists) {
      throw new AppError('Email address already used');
    }
    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      company_id,
      type,
    });
    return user;
  }
}

export default CreateUserService;
