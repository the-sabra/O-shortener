import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserDto } from '../Dtos/CreateUser.dto';
import { LoginDto } from '../Dtos/logn.dto';
import { AuthGuard } from '../guard/auth/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  @UsePipes(new ValidationPipe())
  userSignIn(@Body() userData: UserDto) {
    return this.authService.signIn(userData);
  }
  @Post('/login')
  @UsePipes(new ValidationPipe())
  userLogin(@Body() form: LoginDto) {
    return this.authService.login(form.email, form.password);
  }
}