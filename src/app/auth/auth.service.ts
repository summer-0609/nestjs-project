import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';

import { UsersService } from '../users/users.service';
import { Users } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user) {
      const { password, ...result } = user;
      if (email !== result.email || !compareSync(pass, password)) {
        return { data: null, message: '邮箱或密码错误' };
      }
      return { data: result };
    }
    return { data: null, message: '用户不存在' };
  }

  async login(user: Users): Promise<{ access_token: string }> {
    const { email, id } = user;
    return {
      access_token: this.jwtService.sign({ email, sub: id }),
    };
  }
}
