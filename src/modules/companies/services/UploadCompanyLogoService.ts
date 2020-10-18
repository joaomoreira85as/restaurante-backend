import Company from '@modules/companies/infra/typeorm/entities/Company';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ICompaniesRepository from '../repositories/ICompaniesRepository';

interface IRequest {
  company_id: number;
  logoFileName: string;
}
@injectable()
class UploadCompanyAvatarService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    company_id,
    logoFileName,
  }: IRequest): Promise<Company> {
    const company = await this.companiesRepository.findById(company_id);
    if (!company) {
      throw new AppError('Only authenticated company can change logo.', 401);
    }
    if (company.logo) {
      // Deletar logo anterior
      await this.storageProvider.deleteFile(company.logo);
    }
    company.logo = await this.storageProvider.saveFile(logoFileName);
    this.companiesRepository.save(company);
    return company;
  }
}

export default UploadCompanyAvatarService;
