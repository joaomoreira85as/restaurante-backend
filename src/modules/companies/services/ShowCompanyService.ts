import Company from '@modules/companies/infra/typeorm/entities/Company';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICompaniesRepository from '../repositories/ICompaniesRepository';

interface IRequest {
  company_id: number;
}

@injectable()
class ShowCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({ company_id }: IRequest): Promise<Company> {
    const user = await this.companiesRepository.findById(company_id);
    if (!user) {
      throw new AppError('Company is not exists');
    }

    return this.companiesRepository.save(user);
  }
}

export default ShowCompanyService;
