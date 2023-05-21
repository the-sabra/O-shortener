import { IsAlpha, IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsAlpha()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
