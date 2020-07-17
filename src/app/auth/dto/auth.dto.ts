import { IsString, IsEmail, IsPhoneNumber, IsOptional, IsUUID } from 'class-validator';

export class AuthDto {
  @IsUUID(4)
  @IsOptional()
  readonly id: string

  @IsString()
  readonly username: string;

  @IsEmail()
  readonly email: string

  @IsString()
  readonly password: string;

  @IsPhoneNumber('CN')
  @IsOptional()
  readonly phone: string;
}


export class LoginDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}

