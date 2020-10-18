import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  company_id: number;
}

@injectable()
class FindAllUsersByCompanyService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ company_id }: IRequest): Promise<User[]> {
    return this.usersRepository.findAll(company_id);
  }
}

export default FindAllUsersByCompanyService;
