import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRespository';

interface IRequest {
  user_id: number;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
  }: IRequest): Promise<void> {
    
    if (!await this.usersRepository.delete(user_id)) {
      throw new AppError('User cannot be deleted');
    }
  }
}

export default DeleteUserService;
