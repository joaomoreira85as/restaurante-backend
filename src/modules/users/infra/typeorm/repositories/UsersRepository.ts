import { getRepository, Repository } from 'typeorm';
import IUsersRespository from '@modules/users/repositories/IUsersRespository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../entities/User';

class UsersRepository implements IUsersRespository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findAll(company_id: number): Promise<User[]> {
    return this.ormRepository.find({ where: { company_id } });
  }

  public async findById(id: number): Promise<User | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { email } });
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    this.ormRepository.save(user);

    return user;
  }

  save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
