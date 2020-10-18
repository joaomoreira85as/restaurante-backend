import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRespository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: number;
  name: string;
  email: string;
  type: string;
  password: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('BcryptHashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    type,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User is not exists');
    }

    const userWithUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdateEmail && `${userWithUpdateEmail.id}` !== `${user_id}`) {
      throw new AppError('E-mail already in use');
    }

    if (user.email) user.email = email;
    if (user.name) user.name = name;
    if (user.type) user.type = type;
    if (password) {
      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateUserService;
