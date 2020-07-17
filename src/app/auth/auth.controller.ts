import {
  Controller,
  Inject,
  Post,
  UseGuards,
  Body,
  Req,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthDto } from './dto/auth.dto';
import { Users } from '../users/users.model';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthService') private readonly authService,
    @Inject('UsersService') private readonly usersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  @Post('login')
  async login(@Req() req: Request): Promise<Users> {
    return this.authService.login(req.user);
  }

  @HttpCode(200)
  @Post('/register')
  async register(
    @Body() body: AuthDto,
  ): Promise<Users | { code: number; message: string }> {
    const { email } = body;
    const user = await this.usersService.findOne(email);
    if (user && user.id) {
      return { code: 403, message: '该邮箱已被占用' };
    }
    return this.usersService.create(user);
  }
}
