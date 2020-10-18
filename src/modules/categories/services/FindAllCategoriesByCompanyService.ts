import { inject, injectable } from 'tsyringe';
import Category from '../infra/typeorm/entities/Category';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  company_id: number;
}

@injectable()
class FindAllCategoriesByCompanyService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ company_id }: IRequest): Promise<Category[]> {
    return this.categoriesRepository.findAll(company_id);
  }
}

export default FindAllCategoriesByCompanyService;
