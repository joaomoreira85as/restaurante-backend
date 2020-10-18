import UploadCompanyLogoService from '@modules/companies/services/UploadCompanyLogoService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CompanyLogoController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.headers;
    const service = container.resolve(UploadCompanyLogoService);

    const company = await service.execute({
      company_id: Number(company_id),
      logoFileName: request.file.filename,
    });
    return response.json(classToClass(company));
  }
}
