/* eslint-disable */
import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,

} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Auth } from './decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @Auth(Role.USER) // solo los usuarios con rol USER pueden acceder a este endpoint
  profile(@Request() req) {
    return req.user;
  }
}
