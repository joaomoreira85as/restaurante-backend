import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import aws from 'aws-sdk';
import mailConfig from '@config/mail';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    const SESConfig = {
      // apiVersion: '2010-12-01',
      apiVersion: '2012-10-17',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      accessSecretKey: process.env.AWS_ACCESS_SECRET_KEY,
      region: 'sa-east-1',
    };
    aws.config.update(SESConfig);
    this.client = nodemailer.createTransport({
      SES: new aws.SES(),
    });
  }

  async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { email, name } = mailConfig.defaults.from;
    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
