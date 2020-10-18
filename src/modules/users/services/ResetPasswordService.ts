import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRespository';
import IUserTokensRepository from '../repositories/IUserTokensRespository';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('BcryptHashProvider')
    private hashProvider: IHashProvider,
    @inject('UserTokensRepository')
    private usersTokenRepository: IUserTokensRepository,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokenRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('User token does not exists');
    }
    const user = await this.usersRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError('User token does not exists');
    }
    const tokenCreatedAt = userToken.created_at;
    const comparedDate = addHours(tokenCreatedAt, 2);
    if (isAfter(Date.now(), comparedDate)) {
      throw new AppError('Token expired');
    }
    user.password = await this.hashProvider.generateHash(password);
    await this.usersRepository.save(user);
  }
}

export default SendForgotPasswordEmailService;
