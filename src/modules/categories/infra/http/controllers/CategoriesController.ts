import CreateCategoryService from '@modules/categories/services/CreateCategoryService';
import DeleteCategoryService from '@modules/categories/services/DeleteCategoryService';
import FindAllCategoriesByCompanyService from '@modules/categories/services/FindAllCategoriesByCompanyService';
import ShowCategoryService from '@modules/categories/services/ShowCategoryService';
import UpdateCategoryService from '@modules/categories/services/UpdateCategoryService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CategoriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { company_id } = request;
    const service = container.resolve(FindAllCategoriesByCompanyService);
    const categories = await service.execute({
      company_id: Number(company_id),
    });
    return response.json(classToClass(categories));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service = container.resolve(ShowCategoryService);
    const category = await service.execute({
      category_id: Number(id),
    });
    return response.json(classToClass(category));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;
    const service = container.resolve(DeleteCategoryService);
    await service.execute({
      category_id: Number(id),
    });
    return response.status(204).json();
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, order } = request.body;
    const { company_id } = request.headers;

    const service = container.resolve(CreateCategoryService);
    const category = await service.execute({
      company_id: Number(company_id),
      name,
      order,
    });
    return response.json(classToClass(category));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, order } = request.body;
    const { category_id } = request.headers;

    const service = container.resolve(UpdateCategoryService);
    const category = await service.execute({
      category_id: Number(category_id),
      name,
      order,
    });
    return response.json(classToClass(category));
  }
}
