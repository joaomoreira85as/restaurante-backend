import UploadUserAvatarService from '@modules/users/services/UploadUserAvatarService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const service = container.resolve(UploadUserAvatarService);
    const { user_id } = request.headers;
    const user = await service.execute({
      user_id: Number(user_id),
      avatarFilename: request.file.filename,
    });
    return response.json(classToClass(user));
  }
}
