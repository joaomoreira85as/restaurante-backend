import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  category_id: number;
}

@injectable()
class FindAllProductsByCompanyService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ category_id }: IRequest): Promise<Product[]> {
    return this.productsRepository.findAll(category_id);
  }
}

export default FindAllProductsByCompanyService;
