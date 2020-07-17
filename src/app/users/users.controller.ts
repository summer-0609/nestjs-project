import { Controller, Inject, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Users } from './users.model';

@Controller('users')
export class UsersController {
  constructor(@Inject('UsersService') private readonly usersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  getProfile(@Req() req: Request): Partial<Users> {
    return req.user;
  }

  @Get()
  getHello(): any {
    return this.usersService.findAll();
  }
}
