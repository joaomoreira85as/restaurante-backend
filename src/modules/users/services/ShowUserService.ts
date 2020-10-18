import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRespository';

interface IRequest {
  user_id: number;
}

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User is not exists');
    }

    return this.usersRepository.save(user);
  }
}

export default ShowUserService;
