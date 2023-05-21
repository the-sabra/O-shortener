import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserDto } from '../Dtos/CreateUser.dto';
import { LoginDto } from '../Dtos/logn.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  @UsePipes(new ValidationPipe())
  async userSignup(@Body() userData: UserDto) {
    return await this.authService.signUp(userData);
  }
  @Post('/login')
  @UsePipes(new ValidationPipe())
  userLogin(@Body() form: LoginDto) {
    return this.authService.login(form.email, form.password);
  }
}
