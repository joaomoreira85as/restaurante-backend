import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import path from 'path';
import IUsersRepository from '../repositories/IUsersRespository';
import IUserTokensRepository from '../repositories/IUserTokensRespository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email address not exists');
    }
    const { token } = await this.userTokensRepository.generate(user.id);
    await this.mailProvider.sendMail({
      to: {
        email: user.email,
        name: user.name,
      },
      subject: '[Empresa] Recuperação de senha.',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_URL_WEB}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordService;
