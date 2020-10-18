import Product from '@modules/products/infra/typeorm/entities/Product';
import { inject, injectable } from 'tsyringe';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  order: number;
  company_id: number;
  category_id: number;
  price: number;
}
@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    name,
    order,
    company_id,
    category_id,
    price,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.create({
      name,
      order,
      company_id,
      category_id,
      price,
    });
    return this.productsRepository.save(product);
  }
}

export default CreateProductService;
