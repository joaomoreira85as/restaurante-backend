import Product from '@modules/products/infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  product_id: number;
  name: string;
  order: number;
  category_id: number;
  price: number;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    product_id,
    name,
    order,
    category_id,
    price,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(product_id);
    if (!product) {
      throw new AppError('Product is not exists');
    }

    if (product.order) product.order = order;
    if (product.name) product.name = name;
    if (product.category_id) product.category_id = category_id;
    if (product.price) product.price = price;

    return this.productsRepository.save(product);
  }
}

export default UpdateProductService;
