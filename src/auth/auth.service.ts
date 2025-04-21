/* eslint-disable */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/common/enums/rol.enum';



@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findByUsernameWithPassword(registerDto.username);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10)
    const newUser = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
      role: Role.ADMIN // asignar el rol por defecto al crear un nuevo usuario
    });
    
    // excluir el password del objeto que se devuelve
    const { password, ...result } = newUser

    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByUsernameWithPassword(loginDto.username)
    if(!user) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password)

    if(!isPasswordValid) {
      throw new UnauthorizedException('Password is wrong')
    }

    const payload = {role: user.role}; // aqui le digo que campos van a viajar en el token (role)
    const token = await this.jwtService.signAsync(payload)
    return {
      token,
      role: user.role
    };
  }

  async profile({username, role} : {username: string, role: string}) {
    return await this.usersService.findOne(username)
  }
}
