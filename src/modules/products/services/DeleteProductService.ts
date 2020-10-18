import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  product_id: number;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ product_id }: IRequest): Promise<void> {
    const product = await this.productsRepository.findById(product_id);
    if (!product) {
      throw new AppError('Product is not exists');
    }
    if (product.photo) {
      this.storageProvider.deleteFile(product.photo);
    }
    await this.productsRepository.delete(product_id);
  }
}

export default DeleteProductService;
