import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductsRepository {
  findAll(category_id: number): Promise<Product[]>;
  findById(id: number): Promise<Product | undefined>;
  delete(id: number): Promise<void>;
  create(data: ICreateProductDTO): Promise<Product>;
  save(user: Product): Promise<Product>;
}
