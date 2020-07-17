import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';
import { AuthDto } from '../auth/dto/auth.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private readonly UsersModel: typeof Users,
  ) {}

  findAll(): Promise<Users[]> {
    return this.UsersModel.findAll();
  }

  findOne(email: string): Promise<Users> {
    return this.UsersModel.findOne({
      where: { email },
      raw: true
    });
  }

  async create(user: AuthDto): Promise<any> {
    const result: Users = await this.UsersModel.create(user);
    return {
      code: 0,
      data: { userId: result.getDataValue('id') },
      success: true,
    };
  }
}
