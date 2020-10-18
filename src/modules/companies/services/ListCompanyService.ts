import Company from '@modules/companies/infra/typeorm/entities/Company';
import { inject, injectable } from 'tsyringe';
import ICompanyRepository from '../repositories/ICompaniesRespository';

@injectable()
class ListCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompanyRepository,
  ) {}

  public async execute(): Promise<Company[]> {
    return this.companiesRepository.findAll();
  }
}

export default ListCompanyService;
