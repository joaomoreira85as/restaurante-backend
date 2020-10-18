import { getRepository, Repository } from 'typeorm';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import ICreateCompanyDTO from '@modules/companies/dtos/ICreateCompanyDTO';
import Company from '../entities/Company';

class CompaniesRepository implements ICompaniesRepository {
  private ormRepository: Repository<Company>;

  constructor() {
    this.ormRepository = getRepository(Company);
  }

  async findAll(): Promise<Company[]> {
    return this.ormRepository.find();
  }

  async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findById(id: number): Promise<Company | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findByEmail(email: string): Promise<Company | undefined> {
    return this.ormRepository.findOne({ where: { email } });
  }

  public async findByCnpj(cnpj: string): Promise<Company | undefined> {
    return this.ormRepository.findOne({ where: { cnpj } });
  }

  public async create(companyData: ICreateCompanyDTO): Promise<Company> {
    const company = this.ormRepository.create(companyData);

    await this.ormRepository.save(company);

    return company;
  }

  public async save(company: Company): Promise<Company> {
    return this.ormRepository.save(company);
  }
}

export default CompaniesRepository;
