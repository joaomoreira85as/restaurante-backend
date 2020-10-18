import { getRepository, Repository } from 'typeorm';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';
import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  async findAll(company_id: number): Promise<Category[]> {
    return this.ormRepository.find({
      where: { company_id },
      order: {
        order: 'ASC',
        name: 'ASC',
      },
    });
  }

  public async findById(id: number): Promise<Category | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async delete(id: number): Promise<void> {
    this.ormRepository.delete(id);
  }

  public async create(categoryData: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create(categoryData);

    this.ormRepository.save(category);

    return category;
  }

  save(category: Category): Promise<Category> {
    return this.ormRepository.save(category);
  }
}

export default CategoriesRepository;
