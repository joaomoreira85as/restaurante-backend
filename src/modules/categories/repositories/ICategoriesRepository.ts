import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import Category from '../infra/typeorm/entities/Category';

export default interface ICategoriesRepository {
  findAll(company_id: number): Promise<Category[]>;
  findById(id: number): Promise<Category | undefined>;
  delete(id: number): Promise<void>;
  create(data: ICreateCategoryDTO): Promise<Category>;
  save(user: Category): Promise<Category>;
}
