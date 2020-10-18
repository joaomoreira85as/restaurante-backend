import Product from '@modules/products/infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  product_id: number;
  photoFileName: string;
}
@injectable()
class UploadProductAvatarService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    product_id,
    photoFileName,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(product_id);
    if (!product) {
      throw new AppError('Only authenticated product can change photo.', 401);
    }
    if (product.photo) {
      // Deletar photo anterior
      await this.storageProvider.deleteFile(product.photo);
    }
    product.photo = await this.storageProvider.saveFile(photoFileName);
    this.productsRepository.save(product);
    return product;
  }
}

export default UploadProductAvatarService;
