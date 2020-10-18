import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import FindAllUsersByCompanyService from '@modules/users/services/FindAllUsersByCompanyService';
import ShowUserService from '@modules/users/services/ShowUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { company_id } = request;
    const service = container.resolve(FindAllUsersByCompanyService);
    const users = await service.execute({
      company_id: Number(company_id),
    });
    return response.json(classToClass(users));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service = container.resolve(ShowUserService);
    const user = await service.execute({
      user_id: Number(id),
    });
    return response.json(classToClass(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.headers;
    const service = container.resolve(DeleteUserService);
    await service.execute({
      user_id: Number(id),
    });
    return response.status(204).json();
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, type } = request.body;
    const { company_id } = request.headers;

    const service = container.resolve(CreateUserService);
    const user = await service.execute({
      company_id: Number(company_id),
      name,
      email,
      password,
      type,
    });
    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, type } = request.body;
    const { user_id } = request.headers;

    const service = container.resolve(UpdateUserService);
    const user = await service.execute({
      user_id: Number(user_id),
      name,
      email,
      password,
      type,
    });
    return response.json(classToClass(user));
  }
}
