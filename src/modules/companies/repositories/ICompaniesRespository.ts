import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';
import Company from '../infra/typeorm/entities/Company';

export default interface ICompaniesRepository {
  findAll(): Promise<Company[]>;
  findById(id: number): Promise<Company | undefined>;
  findByEmail(email: string): Promise<Company | undefined>;
  findByCnpj(cnpj: string): Promise<Company | undefined>;
  create(data: ICreateCompanyDTO): Promise<Company>;
  save(company: Company): Promise<Company>;
  delete(id: number): Promise<void>;
}
