import Company from '@modules/companies/infra/typeorm/entities/Company';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICompanyRepository from '../repositories/ICompaniesRespository';

interface IRequest {
  id: number;
  name: string;
  email: string;
  cnpj: string;
}

@injectable()
class UpdateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompanyRepository,
  ) {}

  public async execute({ id, name, email, cnpj }: IRequest): Promise<Company> {
    const company = await this.companiesRepository.findById(id);
    if (!company) {
      throw new AppError('Company not exists');
    }
    if (name) company.name = name;
    if (email) company.email = email;
    if (cnpj) company.cnpj = cnpj;
    await this.companiesRepository.save(company);
    return company;
  }
}

export default UpdateCompanyService;
