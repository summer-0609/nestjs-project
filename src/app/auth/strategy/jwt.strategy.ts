import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { Users } from '../../users/users.model';

export interface IUser {
  sub?: string;
  userId?: string;
  email: string;
}

@Injectable()
export class Jwtssstrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: IUser): Promise<Users> {
    const { email } = payload;
    const result = await this.userService.findOne(email);
    return result;
  }
}
