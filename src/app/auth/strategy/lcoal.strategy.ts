import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, passsword: string): Promise<any> {
    const result = await this.authService.validateUser(email, passsword);
    if (!result || !result.data) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: result.message,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return result.data;
  }
}
