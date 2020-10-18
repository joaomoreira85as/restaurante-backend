import CreateCompanyService from '@modules/companies/services/CreateCompanyService';
import UpdateCompanyService from '@modules/companies/services/UpdateCompanyService';
import DeleteCompanyService from '@modules/companies/services/DeleteCompanyService';
import ListCompanyService from '@modules/companies/services/ListCompanyService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowCompanyService from '@modules/companies/services/ShowCompanyService';

export default class CompaniesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const createCompany = container.resolve(ListCompanyService);
    const companies = await createCompany.execute();
    return response.json(classToClass(companies));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const createCompany = container.resolve(ShowCompanyService);
    const company = await createCompany.execute({ company_id: Number(id) });
    return response.json(classToClass(company));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, cnpj } = request.body;
    const createCompany = container.resolve(CreateCompanyService);
    const user = await createCompany.execute({
      name,
      email,
      cnpj,
    });
    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.headers;
    const { name, email, cnpj } = request.body;

    const service = container.resolve(UpdateCompanyService);
    const user = await service.execute({
      id: Number(company_id),
      name,
      email,
      cnpj,
    });
    return response.json(classToClass(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.headers;

    const service = container.resolve(DeleteCompanyService);
    await service.execute(Number(company_id));
    return response.status(204).json();
  }
}
