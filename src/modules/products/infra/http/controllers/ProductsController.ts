import CreateProductService from '@modules/products/services/CreateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import FindAllService from '@modules/products/services/FindAllService';
import ShowProductService from '@modules/products/services/ShowProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.headers;
    const service = container.resolve(FindAllService);
    const products = await service.execute({
      category_id: Number(category_id),
    });
    return response.json(classToClass(products));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service = container.resolve(ShowProductService);
    const product = await service.execute({
      product_id: Number(id),
    });
    return response.json(classToClass(product));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;
    const service = container.resolve(DeleteProductService);
    await service.execute({
      product_id: Number(id),
    });
    return response.status(204).json();
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, order, price } = request.body;
    const { category_id } = request.headers;
    const { company_id } = request;

    const service = container.resolve(CreateProductService);
    const product = await service.execute({
      company_id: Number(company_id),
      category_id: Number(category_id),
      name,
      order,
      price,
    });
    return response.json(classToClass(product));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, order, price, category_id } = request.body;
    const { product_id } = request.headers;

    const service = container.resolve(UpdateProductService);
    const product = await service.execute({
      category_id: Number(category_id),
      product_id: Number(product_id),
      name,
      order,
      price,
    });
    return response.json(classToClass(product));
  }
}
