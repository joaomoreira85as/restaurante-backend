import { getRepository, Repository } from 'typeorm';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  async findAll(category_id: number): Promise<Product[]> {
    return this.ormRepository.find({
      where: { category_id },
      order: {
        order: 'ASC',
        name: 'ASC',
      },
    });
  }

  public async findById(id: number): Promise<Product | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async delete(id: number): Promise<void> {
    this.ormRepository.delete(id);
  }

  public async create(productData: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(productData);

    this.ormRepository.save(product);

    return product;
  }

  save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }
}

export default ProductsRepository;
