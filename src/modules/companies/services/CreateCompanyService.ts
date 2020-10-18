import Company from '@modules/companies/infra/typeorm/entities/Company';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICompanyRepository from '../repositories/ICompaniesRepository';

interface IRequest {
  name: string;
  email: string;
  cnpj: string;
}

@injectable()
class CreateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompanyRepository,
  ) {}

  public async execute({ name, email, cnpj }: IRequest): Promise<Company> {
    const existsCompanyEmail = await this.companiesRepository.findByEmail(
      email,
    );
    if (existsCompanyEmail) {
      throw new AppError('Já existe empresa com esse e-mail.');
    }
    const existsCompanyCnpj = await this.companiesRepository.findByCnpj(cnpj);
    if (existsCompanyCnpj) {
      throw new AppError('Já existe empresa com esse cnpj.');
    }
    const company = this.companiesRepository.create({
      name,
      email,
      cnpj,
    });
    return company;
  }
}

export default CreateCompanyService;
