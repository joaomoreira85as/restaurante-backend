import { inject, injectable } from 'tsyringe';
import ICompanyRepository from '../repositories/ICompaniesRespository';

@injectable()
class DeleteCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompanyRepository,
  ) {}

  public async execute(id: number): Promise<void> {
    await this.companiesRepository.delete(id);
  }
}

export default DeleteCompanyService;
