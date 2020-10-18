import Category from '@modules/categories/infra/typeorm/entities/Category';
import { inject, injectable } from 'tsyringe';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  company_id: number;
  order: number;
}

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    name,
    order,
    company_id,
  }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.create({
      name,
      order,
      company_id,
    });
    return this.categoriesRepository.save(category);
  }
}

export default CreateCategoryService;
