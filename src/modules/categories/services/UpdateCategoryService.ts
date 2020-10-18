import Category from '@modules/categories/infra/typeorm/entities/Category';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IRequest {
  category_id: number;
  name: string;
  order: number;
}

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    category_id,
    name,
    order,
  }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.findById(category_id);
    if (!category) {
      throw new AppError('Category is not exists');
    }

    if (category.order) category.order = order;
    if (category.name) category.name = name;

    return this.categoriesRepository.save(category);
  }
}

export default UpdateCategoryService;
